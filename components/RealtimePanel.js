import { useEffect, useState } from 'react'

export default function RealtimePanel({ open, onClose }) {
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (!open) return
    const es = new EventSource('/api/realtime')
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        setEvents((s) => [data, ...s].slice(0, 100))
      } catch (err) {}
    }
    es.onerror = () => es.close()
    return () => es.close()
  }, [open])

  if (!open) return null

  return (
    <div className="realtime-drawer" role="dialog" aria-label="Realtime Events">
      <div className="realtime-header">
        <h3>Realtime Events</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="realtime-list">
        {events.length === 0 ? (
          <div className="muted">No events yet — waiting for server...</div>
        ) : (
          <ul>
            {events.map((ev) => (
              <li key={ev.count}><strong>{ev.count}:</strong> {ev.timestamp}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
