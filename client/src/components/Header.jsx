import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reserve', label: 'Reserve' },
  { to: '/contact', label: 'Contact' },
  { to: '/order', label: 'Order Online' },
  { to: '/blog', label: 'Blog' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="nav-inner">
        <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
          Brew & Flour
        </NavLink>
        <nav className={`nav-links${open ? ' open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          &#9776;
        </button>
      </div>
    </header>
  )
}
