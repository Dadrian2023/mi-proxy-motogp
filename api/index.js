export default async function handler(req, res) {
  // Cabeceras CORS completas
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Responder rápido a preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const targetUrl = req.query.url;

  if (!targetUrl) {
    res.status(400).json({ error: 'Falta el parametro url' });
    return;
  }

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  try {
    const response = await fetch(targetUrl);
    const data = await response.text();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
