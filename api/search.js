export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { location, searchTerm } = req.body;
  if (!location) {
    return res.status(400).json({ message: 'Location is required' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ message: 'OpenAI API key not configured. Add it in Vercel settings.' });
  }

  const systemMessage = `You are a helpful assistant specialized in identifying independently owned local businesses vs corporate/private-equity-owned chains.`;
  
  const userMessage = `Find local businesses for the term "${searchTerm || 'any service'}" in the location "${location}".

Your goal is to find TRULY INDEPENDENT, family-owned, or locally-owned businesses.
Return a list of 18-22 businesses.
1. At least 70% must be strongly suspected to be INDEPENDENT (family-owned, single location, local history, NO private equity, NO venture capital).
2. The remaining 30% should be chains or corporate/PE-owned businesses to provide contrast.

You must respond with valid JSON ONLY matching this schema strictly:
{
  "businesses": [
    {
      "name": "string",
      "address": "string",
      "phone": "string",
      "website": "string",
      "category": "string",
      "rating": "number (out of 5.0)",
      "pe_ownership_status": "string (must be EXACTLY one of: independent, pe_owned, unsure)",
      "verification_snippet": "string (Detailed evidence explaining the specific ownership status, mentioning family names or corporate owners)"
    }
  ]
}

Ensure the response is raw JSON without markdown formatting (\`\`\`).`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenAI Error:', err);
      return res.status(502).json({ message: 'Failed to fetch from OpenAI' });
    }

    const data = await response.json();
    const resultJsonStr = data.choices[0].message.content;
    const resultObj = JSON.parse(resultJsonStr);

    return res.status(200).json(resultObj);
  } catch (error) {
    console.error('API Route Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
