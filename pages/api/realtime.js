export default function handler(req, res) {
  // Set headers for Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  // Send an initial comment to establish the stream
  res.write(': connected\n\n')

  let count = 0
  const iv = setInterval(() => {
    count += 1
    const payload = { timestamp: new Date().toISOString(), count }
    res.write(`data: ${JSON.stringify(payload)}\n\n`)
  }, 1000)

  req.on('close', () => {
    clearInterval(iv)
    try { res.end() } catch (e) {}
  })
}
