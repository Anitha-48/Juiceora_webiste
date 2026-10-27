import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Droplet, Leaf, Sparkles, Sun } from 'lucide-react'
import { products } from '../data/products.js'
import ScrollVideoScene from '../components/ScrollVideoScene.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import ProductModal from '../components/ProductModal.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import pomegranateVideo from '../puplic/images/Pomegrant-animate-scroll.mp4'
import blueberryVideo from '../puplic/images/blue berry-animate-scroll.mp4'

let homeIntroShown = false

const fruitBenefits = [
  { icon: Sun, title: 'Naturally vibrant', description: 'Fruit brings bright colour and a naturally lively taste to every day.' },
  { icon: Droplet, title: 'A refreshing choice', description: 'Water-rich fruits can be part of a refreshing way to enjoy your day.' },
  { icon: Leaf, title: 'Goodness from plants', description: 'Different fruits offer their own mix of naturally occurring nutrients.' },
  { icon: Sparkles, title: 'Enjoy the whole fruit', description: 'Whole fruit provides dietary fibre; juicing can remove much of the pulp.' },
]

export default function Home() {
  const hero = useRef(null)
  const pomegranateStory = useRef(null)
  const pomegranateCopy = useRef(null)
  const blueberryStory = useRef(null)
  const [sel, setSel] = useState(null)
  const [showIntro, setShowIntro] = useState(() => !homeIntroShown)
  const [introLeaving, setIntroLeaving] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const introStarted = useRef(Date.now())
  homeIntroShown = true

  useEffect(() => {
    if (!showIntro) return undefined
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minimumDuration = reducedMotion ? 350 : 1400
    const reveal = () => {
      setIntroLeaving(true)
      window.setTimeout(() => setShowIntro(false), reducedMotion ? 0 : 650)
    }
    const fallback = window.setTimeout(reveal, 5500)
    let readyTimer
    if (videoReady) {
      const elapsed = Date.now() - introStarted.current
      readyTimer = window.setTimeout(reveal, Math.max(0, minimumDuration - elapsed))
    }
    return () => {
      window.clearTimeout(fallback)
      window.clearTimeout(readyTimer)
    }
  }, [showIntro, videoReady])

  const nav = useCallback(d => setSel(s => products[(products.indexOf(s) + d + products.length) % products.length]), [])
  const updatePomegranateOverlay = useCallback((progress) => {
    const fade = Math.max(0, Math.min(1, (progress - 0.78) / 0.22))
    if (pomegranateCopy.current) pomegranateCopy.current.style.opacity = String(1 - fade)
  }, [])
  return (<>
    <section className={`hero hero-video-hero${videoReady ? ' video-ready' : ''}`} ref={hero} aria-label="Juice-making video controlled by scrolling">
      <ScrollVideoScene triggerRef={hero} onReady={() => setVideoReady(true)} />
    </section>
    {showIntro && <div className={`home-intro${introLeaving ? ' home-intro-leaving' : ''}`} role="status" aria-live="polite">
      <div className="intro-brand" aria-label="Juicora">
        <span>JUI</span><span className="intro-brand-accent">C</span><span>ORA</span>
      </div>
      <span className="intro-loader" aria-hidden="true" />
      <span className="intro-caption">A little sunshine is on its way</span>
    </div>}
    <section className="section"><ScrollReveal><h2>Four flavours. One fresh idea.</h2></ScrollReveal>
      <ProductGrid products={products} onOpen={setSel} /></section>
    <section className="pomegranate-story" ref={pomegranateStory} aria-label="Pomegranate juice story, controlled by scrolling">
      <ScrollVideoScene
        triggerRef={pomegranateStory}
        source={pomegranateVideo}
        label="Pomegranate juice-making video, controlled by scrolling"
        className="pomegranate-story-video"
        onProgress={updatePomegranateOverlay}
      />
      <div className="pomegranate-story-copy" ref={pomegranateCopy}>
        <p className="kicker">Fresh from the fruit</p>
        <h2>Goodness You Can Feel.</h2>
        <p>Follow the pomegranate story, one scroll at a time.</p>
      </div>
    </section>
    <section className="section fruit-benefits" aria-labelledby="fruit-benefits-title">
      <ScrollReveal>
        <p className="kicker">A little goodness, naturally</p>
        <h2 id="fruit-benefits-title">The bright side of fruit.</h2>
      </ScrollReveal>
      <div className="grid">
        {fruitBenefits.map(({ icon: Icon, title, description }, index) => (
          <ScrollReveal key={title} delay={index * 90}>
            <article className="card tile fruit-benefit-card">
              <span className="fruit-benefit-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.8} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
    <section className="blueberry-story" ref={blueberryStory} aria-label="Blueberry juice story, controlled by scrolling">
      <ScrollVideoScene
        triggerRef={blueberryStory}
        source={blueberryVideo}
        label="Blueberry juice-making video, controlled by scrolling"
        className="blueberry-story-video"
      />
    </section>
    <section className="cta"><ScrollReveal><h2>Find Your Fresh Favourite</h2><p>Pick a flavour and see what is waiting in the bottle.</p><Link className="btn" to="/juices">Explore All Juices</Link></ScrollReveal></section>
    {sel && <ProductModal p={sel} onClose={() => setSel(null)} onNav={nav} />}
  </>)
}
