export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, firm, position, deskSize, interest, note } = req.body;

  const response = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Kaspaflow%20Contact%20form`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Name: name,
          'Work Email': email,
          Firm: firm,
          Position: position,
          'Desk Size': deskSize,
          'Module Interest': interest,
          'Your Operation': note,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error('Airtable error:', err);
    return res.status(500).json({ error: 'Airtable failed' });
  }

  res.status(200).json({ ok: true });
}
