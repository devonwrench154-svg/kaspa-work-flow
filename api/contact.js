// Vercel serverless function — proxies contact form submissions to Airtable.
// The AIRTABLE_API_KEY env var is set in Vercel's dashboard (Settings → Environment Variables).
// It is NEVER committed to the repository.

const AIRTABLE_BASE_ID = 'appBqsswh4l3BAJrZ';
const AIRTABLE_TABLE   = 'Kaspaflow Contact form';

module.exports = async (req, res) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, firm, position, deskSize, interest, note } = req.body || {};

  // Basic server-side validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    console.error('AIRTABLE_API_KEY environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

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
            'Name':            name,
            'Firm':            firm     || '',
            'Position':        position || '',
            'Work Email':      email,
            'Desk Size':       deskSize || '',
            'Module Interest': interest || '',
            'Your Operation':  note     || '',
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const body = await airtableRes.text();
      console.error('Airtable error:', airtableRes.status, body);
      return res.status(502).json({ error: 'Failed to save submission' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
};
