import { useEffect, useState } from 'react'

function emptyProduct() {
  return { name: '', price: '', description: '' }
}

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyProduct())
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/products')
      const json = await res.json()
      setProducts(json.products || [])
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function submit(e) {
    e.preventDefault()
    setError(null)
    try {
      if (editingId) {
        const res = await fetch(`/api/products/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Failed to update')
        await load()
        setEditingId(null)
        setForm(emptyProduct())
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Failed to create')
        await load()
        setForm(emptyProduct())
      }
    } catch (e) {
      setError(String(e))
    }
  }

  async function remove(id) {
    if (!confirm('Delete this product?')) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      await load()
    } catch (e) {
      setError(String(e))
    }
  }

  function startEdit(p) {
    setEditingId(p.id)
    setForm({ name: p.name, price: p.price, description: p.description })
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>Product Dashboard</h1>
      <p>Manage demo products (in-memory store).</p>

      <section style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <h2>Products</h2>
          {loading ? (
            <div>Loading…</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Price</th>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Description</th>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td style={{ padding: '8px 4px' }}>{p.name}</td>
                    <td style={{ padding: '8px 4px' }}>${Number(p.price).toFixed(2)}</td>
                    <td style={{ padding: '8px 4px' }}>{p.description}</td>
                    <td style={{ padding: '8px 4px' }}>
                      <button onClick={() => startEdit(p)} style={{ marginRight: 8 }}>Edit</button>
                      <button onClick={() => remove(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ width: 360 }}>
          <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={submit} style={{ display: 'grid', gap: 8 }}>
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit">{editingId ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => { setEditingId(null); setForm(emptyProduct()) }}>Reset</button>
            </div>
          </form>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </div>
      </section>
    </main>
  )
}
