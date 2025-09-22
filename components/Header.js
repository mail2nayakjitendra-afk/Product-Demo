import Logo from './Logo'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <Logo size={36} />
          <h1 className="site-title">Demo Product Dashboard</h1>
        </div>
        <nav className="site-nav">
          <a href="#" onClick={(e) => e.preventDefault()}>Dashboard</a>
          <a href="#" onClick={(e) => e.preventDefault()}>API</a>
        </nav>
      </div>
    </header>
  )
}
