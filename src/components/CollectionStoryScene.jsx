import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import Bottle from './Bottle.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function CollectionStoryScene() {
  const root = useRef(null)

  useLayoutEffect(() => {
    let media
    const ctx = gsap.context(() => {
      media = gsap.matchMedia()
      media.add({
        all: 'all',
        reduce: '(prefers-reduced-motion: reduce)',
        small: '(max-width: 700px)',
      }, ({ conditions }) => {
        const { reduce, small } = conditions
        const select = (selector) => root.current.querySelectorAll(selector)
        if (reduce) {
          gsap.set(select('.collection-bottle'), { autoAlpha: 1, y: 0, rotation: 0, scale: 1 })
          gsap.set(select('.collection-orbit'), { autoAlpha: .35 })
          return
        }

        gsap.set(select('.collection-bottle'), { autoAlpha: 0, y: 100, rotation: (i) => (i - 1.5) * 13, scale: .78 })
        gsap.set(select('.collection-orbit'), { autoAlpha: 0, scale: .5, rotation: -20 })
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: small ? '+=140%' : '+=200%',
            scrub: .7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        timeline.to(select('.collection-bottle'), {
          autoAlpha: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          stagger: .14,
          duration: 2.2,
          ease: 'power2.out',
        }).to(select('.collection-orbit'), { autoAlpha: .35, scale: 1, rotation: 0, duration: 1.3 }, .6)
          .to(select('.collection-bottle'), { y: (i) => i % 2 ? -8 : 8, duration: 1.2, ease: 'sine.inOut' }, 2.4)
        return () => timeline.scrollTrigger?.kill()
      })
    }, root)
    return () => {
      media?.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section className="collection-scene" ref={root} aria-label="The complete Juicora flavour collection">
      <div className="collection-copy">
        <p className="kicker">One fresh idea, four ways</p>
        <h2>Find Your Fresh Favourite.</h2>
        <p>Four fruit-inspired favourites, together in one bright collection.</p>
        <Link className="btn collection-cta" to="/juices">Explore All Juices</Link>
      </div>
      <div className="collection-display">
        <svg className="collection-orbit" viewBox="0 0 700 440" aria-hidden="true">
          <ellipse cx="350" cy="220" rx="300" ry="156" fill="none" stroke="#FFF8EC" strokeWidth="2" strokeDasharray="3 10" />
          <circle cx="78" cy="206" r="10" fill="#fff" />
          <circle cx="610" cy="116" r="7" fill="#fff" />
          <circle cx="548" cy="349" r="12" fill="#fff" />
        </svg>
        <div className="collection-bottles">
          {products.map((product) => <Bottle key={product.id} p={product} className="collection-bottle" />)}
        </div>
      </div>
      <p className="collection-footnote">Illustrated product concepts · explore each flavour in the juice collection</p>
    </section>
  )
}
