import { products, genId } from '../../../lib/store'

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ products })
  }

  if (req.method === 'POST') {
    const { name, price, description } = req.body || {}
    if (!name) return res.status(400).json({ error: 'name required' })
    const p = { id: genId(), name, price: Number(price) || 0, description: description || '' }
    products.push(p)
    return res.status(201).json(p)
  }

  res.setHeader('Allow', 'GET, POST')
  res.status(405).json({ error: 'Method not allowed' })
}
