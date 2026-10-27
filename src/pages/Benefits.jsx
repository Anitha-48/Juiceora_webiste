import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal.jsx'
const faqs = [['Is JUICORA a real product?', 'No. It is a fictional demo brand, so all details are placeholders.'], ['Are there health claims?', 'No. This site makes no medical or nutritional claims.'], ['Can I buy a bottle?', 'Not here. There is no checkout; use the contact form to try the enquiry flow in demo mode.']]
export default function Benefits() {
  const [open, setOpen] = useState(0)
  return (<div className="page"><header className="phero"><h1>Goodness You Can Feel.</h1><p>Demo content describing a fictional product concept.</p></header>
    <section className="section"><div className="grid">{[['Fruit-inspired flavours', 'Orange, mango, strawberry and pineapple.'], ['Refreshing taste', 'Light and bright.'], ['Everyday refreshment', 'Easy to carry and enjoy.'], ['Selected ingredients', 'Placeholder claim for demo.']].map(([t, d], i) => <ScrollReveal key={t} delay={i * 80}><div className="card tile"><h3>{t}</h3><p>{d}</p></div></ScrollReveal>)}</div></section>
    <section className="section alt narrow"><h2>FAQ</h2>{faqs.map(([q, a], i) => (<div className="faq" key={q}><h3><button aria-expanded={open === i} aria-controls={`f${i}`} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span>{open === i ? '–' : '+'}</span></button></h3>{open === i && <p id={`f${i}`}>{a}</p>}</div>))}</section>
    <section className="cta"><h2>Find your flavour</h2><Link className="btn" to="/juices">Explore juices</Link></section></div>)
}
