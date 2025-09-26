import Logo from './Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import RealtimePanel from './RealtimePanel'

export default function Header() {
  const router = useRouter()
  const [openRealtime, setOpenRealtime] = useState(false)

  function goDashboard(e) {
    e.preventDefault()
    if (router.asPath === '/' || router.asPath.startsWith('/#')) {
      const el = document.getElementById('dashboard')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/#dashboard')
    }
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <Logo size={36} />
          <h1 className="site-title">Demo Product Dashboard</h1>
        </div>
        <nav className="site-nav">
          <a href="/#dashboard" onClick={goDashboard}>Dashboard</a>
          <button className="linklike" onClick={(e) => { e.preventDefault(); setOpenRealtime(true) }}>Realtime</button>
        </nav>
        <RealtimePanel open={openRealtime} onClose={() => setOpenRealtime(false)} />
      </div>
    </header>
  )
}
