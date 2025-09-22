import { products } from '../../../lib/store'

export default function handler(req, res) {
  const { id } = req.query
  const store = products
  const idx = store.findIndex((p) => p.id === id)

  if (req.method === 'GET') {
    if (idx === -1) return res.status(404).json({ error: 'not found' })
    return res.status(200).json(store[idx])
  }

  if (req.method === 'PUT') {
    if (idx === -1) return res.status(404).json({ error: 'not found' })
    const { name, price, description } = req.body || {}
    const p = store[idx]
    if (name !== undefined) p.name = name
    if (price !== undefined) p.price = Number(price)
    if (description !== undefined) p.description = description
    return res.status(200).json(p)
  }

  if (req.method === 'DELETE') {
    if (idx === -1) return res.status(404).json({ error: 'not found' })
    const [removed] = store.splice(idx, 1)
    return res.status(200).json(removed)
  }

  res.setHeader('Allow', 'GET, PUT, DELETE')
  res.status(405).json({ error: 'Method not allowed' })
}
