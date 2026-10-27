import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Bottle from './Bottle.jsx'
export default function ProductModal({ p, onClose, onNav }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.focus()
    const k = e => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') onNav(1); if (e.key === 'ArrowLeft') onNav(-1) }
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose, onNav])
  return (<div className="modal" role="dialog" aria-modal="true" aria-label={p.name} onClick={onClose}>
    <div className="mbox" style={{ '--c': p.color }} onClick={e => e.stopPropagation()}>
      <button ref={ref} className="mclose" onClick={onClose} aria-label="Close">×</button>
      <Bottle p={p} className="mbottle" />
      <div><h2>{p.name}</h2><p>{p.long}</p><p><strong>${p.price.toFixed(2)}</strong> (demo price)</p>
        <p className="note">Demo product. There is no checkout; use the enquiry form.</p>
        <div className="prow"><button className="btn ghost small" onClick={() => onNav(-1)}>Previous</button>
          <button className="btn ghost small" onClick={() => onNav(1)}>Next</button>
          <Link className="btn small" to="/contact" onClick={onClose}>Enquire</Link></div></div>
    </div></div>)
}
