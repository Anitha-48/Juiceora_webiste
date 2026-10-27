import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal.jsx'
const steps = ['Choose the fruit', 'Cut and prepare', 'Press the juice', 'Bottle and seal']
export default function About() {
  return (<div className="page"><header className="phero"><h1>From Nature to Your Glass.</h1><p>JUICORA is a fictional brand created for this demo.</p></header>
    <section className="section two"><ScrollReveal><h2>Our story</h2><p>We imagine juice that tastes like the fruit it came from: bright, simple and made to be shared.</p></ScrollReveal>
      <ScrollReveal delay={100}><h2>Mission and vision</h2><p>Mission: make fresh fruit flavours easy to enjoy. Vision: a more colourful everyday break.</p></ScrollReveal></section>
    <section className="section alt"><h2>Values</h2><div className="grid">{['Freshness first', 'Simple recipes', 'Honest claims', 'Playful design'].map((v, i) => <ScrollReveal key={v} delay={i * 80}><div className="card tile"><h3>{v}</h3></div></ScrollReveal>)}</div></section>
    <section className="section"><h2>The journey</h2><ol className="steps">{steps.map(s => <li key={s}>{s}</li>)}</ol></section>
    <section className="cta"><h2>Taste the flavours</h2><Link className="btn" to="/juices">See our juices</Link></section></div>)
}
