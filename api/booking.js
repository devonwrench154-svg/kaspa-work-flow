// api/booking.js — Logs Cal.com bookings to Airtable.
//
// Wire this up in Cal.com:
//   Cal.com dashboard → Settings → Webhooks → Add webhook
//   URL: https://kaspaflow.co.uk/api/booking
//   Events: BOOKING_CREATED, BOOKING_CANCELLED, BOOKING_RESCHEDULED
//
// OR — no webhook setup needed at all if using the client-side Cal("on") listener
// in index.html, which posts directly to this endpoint on bookingSuccessful.
//
// Airtable: create a table called "Kaspaflow Bookings" in base app60Zb1hEqqz50ru
// with these fields (all single-line text unless noted):
//   Name, Email, Timezone, Event, Start Time, End Time, Booking UID, Source, Logged

const AIRTABLE_BASE_ID = 'appBqsswh4l3BAJrZ';
const AIRTABLE_TABLE   = 'Kaspaflow Bookings';

module.exports = async (req, res) => {
  // Allow both POST (from client-side listener) and GET (health check)
  if (req.method === 'GET') return res.status(200).json({ ok: true });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    console.error('AIRTABLE_API_KEY not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Support both client-side payload and Cal.com webhook payload
  const body = req.body || {};
  let name, email, timezone, title, startTime, endTime, uid, source;

  if (body.triggerEvent && body.payload) {
    // Cal.com webhook format
    const p = body.payload;
    const attendee = (p.attendees && p.attendees[0]) || {};
    name      = attendee.name      || '';
    email     = attendee.email     || '';
    timezone  = attendee.timeZone  || '';
    title     = p.title            || '';
    startTime = p.startTime        || '';
    endTime   = p.endTime          || '';
    uid       = p.uid              || '';
    source    = `Cal.com webhook — ${body.triggerEvent}`;
  } else {
    // Client-side Cal("on", "bookingSuccessful") format
    name      = body.name      || '';
    email     = body.email     || '';
    timezone  = body.timezone  || '';
    title     = body.title     || '';
    startTime = body.startTime || '';
    endTime   = body.endTime   || '';
    uid       = body.uid       || '';
    source    = 'Cal.com inline embed';
  }

  if (!email) return res.status(400).json({ error: 'No email in payload' });

  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            'Name':        name,
            'Email':       email,
            'Timezone':    timezone,
            'Event':       title,
            'Start Time':  startTime,
            'End Time':    endTime,
            'Booking UID': uid,
            'Source':      source,
            'Logged':      new Date().toISOString(),
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const text = await airtableRes.text();
      console.error('Airtable error:', airtableRes.status, text);
      return res.status(502).json({ error: 'Failed to log booking' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error in /api/booking:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
};
