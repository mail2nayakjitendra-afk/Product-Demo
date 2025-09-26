import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'

function emptyProduct() {
  return { name: '', price: '', description: '' }
}

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
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

  const { register, handleSubmit, reset, setValue } = useForm({ defaultValues: emptyProduct() })
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')

  async function submit(values) {
    setError(null)
    try {
      if (editingId) {
        const res = await fetch(`/api/products/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error('Failed to update')
        await load()
        setEditingId(null)
        reset(emptyProduct())
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error('Please fill all the product details')
        await load()
        reset(emptyProduct())
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

  // derived list (search + sort)
  const filtered = products.filter((p) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  }).sort((a, b) => {
    if (sortBy === 'price') return Number(a.price) - Number(b.price)
    return a.name.localeCompare(b.name)
  })

  const totalProducts = products.length
  const avgPrice = products.length ? (products.reduce((s, p) => s + Number(p.price || 0), 0) / products.length) : 0

  const PriceChart = dynamic(() => import('../components/PriceChart'), { ssr: false })

  function startEdit(p) {
    setEditingId(p.id)
    // populate react-hook-form fields
    setValue('name', p.name)
    setValue('price', p.price)
    setValue('description', p.description)
  }

  return (
  <main id="dashboard" style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }} tabIndex={-1}>
      <h1>Product Dashboard</h1>
      <p>Manage demo products (in-memory store).</p>

      <section style={{ display: 'flex', gap: 24 }}>
        <div className="products-panel" style={{ flex: 1 }}>
          <div className="dashboard">
            <div className="stat-card">
              <div className="label">Total Products</div>
              <div className="value">{totalProducts}</div>
            </div>
            <div className="stat-card">
              <div className="label">Average Price</div>
              <div className="value">${avgPrice.toFixed(2)}</div>
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <PriceChart products={filtered} />
          </div>

          <div className="controls">
            <input type="search" placeholder="Search products" value={query} onChange={(e) => setQuery(e.target.value)} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort: Name</option>
              <option value="price">Sort: Price</option>
            </select>
          </div>

          <h2>Products</h2>
          {loading ? (
            <div>Loading…</div>
          ) : (
            <table className="products-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>${Number(p.price).toFixed(2)}</td>
                    <td>{p.description}</td>
                    <td className="product-actions">
                      <button className="edit" onClick={() => startEdit(p)}>Edit</button>
                      <button className="delete" onClick={() => remove(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ width: 360 }}>
          <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>
          <form className="product-form" onSubmit={handleSubmit(submit)}>
            <input placeholder="Name" {...register('name')} />
            <input type ="number" placeholder="Price" {...register('price')} />
            <textarea placeholder="Description" {...register('description')} />
            <div className="actions">
              <button type="submit">{editingId ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => { setEditingId(null); reset(emptyProduct()) }}>Reset</button>
            </div>
          </form>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </div>
      </section>
    </main>
  )
}
