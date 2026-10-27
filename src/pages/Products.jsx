import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products.js'
import ProductGrid from '../components/ProductGrid.jsx'
import ProductModal from '../components/ProductModal.jsx'
const cats = ['All', ...new Set(products.map(p => p.category))]
export default function Products() {
  const [params, setParams] = useSearchParams(); const [cat, setCat] = useState('All')
  const sel = products.find(p => p.id === params.get('p'))
  const list = products.filter(p => cat === 'All' || p.category === cat)
  const open = p => setParams({ p: p.id }); const close = useCallback(() => setParams({}), [setParams])
  const nav = useCallback(d => setParams({ p: products[(products.indexOf(sel) + d + products.length) % products.length].id }), [sel, setParams])
  return (<div className="page"><header className="phero"><h1>Our Juices</h1><p>Prices and specifications are demo placeholders.</p></header>
    <div className="filters" role="group" aria-label="Filter by category">{cats.map(c => <button key={c} className={`chip ${cat === c ? 'on' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>
    <section className="section"><ProductGrid products={list} onOpen={open} /></section>
    {sel && <ProductModal p={sel} onClose={close} onNav={nav} />}</div>)
}
