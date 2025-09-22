export default async function handler(req, res) {
  const time = new Date().toISOString()
  if (req.method === 'POST') {
    const body = req.body || {}
    return res.status(200).json({ ok: true, received: body, time })
  }
  res.setHeader('Allow', 'POST')
  return res.status(405).json({ error: 'Method Not Allowed', allowed: ['POST'] })
}
