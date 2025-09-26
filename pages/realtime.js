import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function RealtimePage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const es = new EventSource('/api/realtime')

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        setEvents((s) => [data, ...s].slice(0, 50))
      } catch (err) {
        // ignore parse errors
      }
    }

    es.onerror = () => {
      es.close()
    }

    return () => es.close()
  }, [])

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <nav style={{ marginBottom: '1rem' }}>
        <Link href="/">Home</Link>
      </nav>
      <h2>Realtime Events</h2>
      <p>Incoming timestamped events emitted from the server every second.</p>
      <ul>
        {events.map((ev) => (
          <li key={ev.count}>
            <strong>{ev.count}:</strong> {ev.timestamp}
          </li>
        ))}
      </ul>
    </div>
  )
}
