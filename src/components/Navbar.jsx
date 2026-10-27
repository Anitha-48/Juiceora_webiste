import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
const links = [['/', 'Home'], ['/about', 'About'], ['/juices', 'Juices'], ['/benefits', 'Benefits'], ['/contact', 'Contact']]
export default function Navbar() {
  const [open, setOpen] = useState(false); const [solid, setSolid] = useState(false); const { pathname } = useLocation()
  useEffect(() => { const f = () => setSolid(window.scrollY > 40); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => { const k = e => e.key === 'Escape' && setOpen(false); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [])
  return (
    <header className={`nav ${solid || pathname !== '/' ? 'solid' : ''}`}>
      <Link to="/" className="logo" aria-label="JUICORA home">JUI<span>C</span>ORA</Link>
      <button className="burger" aria-expanded={open} aria-controls="menu" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="menu" className={open ? 'open' : ''} aria-label="Main">
        {links.map(([to, t]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>{t}</NavLink>)}
        <Link className="btn small" to="/juices">Explore Juices</Link>
      </nav>
    </header>)
}
