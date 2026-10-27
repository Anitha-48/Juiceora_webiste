import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// One scroll-scrubbed, pinned timeline: whole orange -> cut -> halves -> slices
// -> juicer -> stream -> bottle fills -> cap -> label -> showcase. Fully reversible.
export default function useBottleStory(root) {
  useLayoutEffect(() => {
    let mm
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia()
      const $ = s => gsap.utils.toArray(s)
      const stage = root.current
      mm.add({ all: 'all', reduce: '(prefers-reduced-motion: reduce)', small: '(max-width: 700px)' }, c => {
        const { reduce, small } = c.conditions
        if (reduce) { // static, usable final state
          gsap.set('.s-orange,.s-knife,.s-halfL,.s-halfR,.s-slice,.s-juicer,.s-stream', { autoAlpha: 0 })
          gsap.set('.s-liquid', { attr: { y: 340 } }); gsap.set('.c3', { autoAlpha: 1 }); return
        }
        gsap.set('.s-halfL,.s-halfR,.s-slice,.s-knife,.s-juicer,.s-stream,.s-bottle,.s-cap,.s-label,.cap,.s-drop', { autoAlpha: 0 })
        gsap.set('.s-liquid', { attr: { y: 575 } })
        gsap.set('.s-stream', { svgOrigin: '400 150', scaleY: 0 })
        gsap.set('.s-label', { svgOrigin: '400 470', scaleX: 0 })
        gsap.set('.s-shine', { x: -40 })
        const tl = gsap.timeline({ defaults: { ease: 'none' },
          scrollTrigger: { trigger: stage, start: 'top top', end: small ? '+=300%' : '+=500%', scrub: 0.6, pin: true, anticipatePin: 1, invalidateOnRefresh: true } })
        // Scene 1: whole orange, rotating, closer
        tl.fromTo('.s-orange', { scale: 0.5, rotation: -40 }, { scale: 1.1, rotation: 25, duration: 3 }, 0)
          .to('.leaf', { rotation: 12, transformOrigin: '0% 100%', duration: 3 }, 0)
          .to(stage, { backgroundColor: '#FFE3C2', duration: 3 }, 0)
          .to('.c1', { autoAlpha: 1, duration: 0.6 }, 0.4).to('.c1', { autoAlpha: 0, y: -40, duration: 0.6 }, 2.5)
        // Scene 2: knife enters, cuts, halves separate
        tl.fromTo('.s-knife', { autoAlpha: 0, x: 260, y: -90, rotation: 35 }, { autoAlpha: 1, x: 0, y: -60, rotation: 0, duration: 1.3 }, 3)
          .to('.s-orange', { rotation: 0, scale: 1, duration: 1.3 }, 3)
          .to('.s-knife', { y: 200, duration: 2 }, 4.4)
          .set('.s-orange', { autoAlpha: 0 }, 5.4).set('.s-halfL,.s-halfR', { autoAlpha: 1 }, 5.4)
          .to('.s-knife', { autoAlpha: 0, x: 220, duration: 0.8 }, 6.4)
          .to('.s-halfL', { x: -120, rotation: -10, duration: 1.6 }, 6.4)
          .to('.s-halfR', { x: 120, rotation: 10, duration: 1.6 }, 6.4)
          .fromTo('.s-drop', { autoAlpha: 0, y: 0, x: 0 }, { autoAlpha: 0.9, y: (i) => 40 + i * 25, x: (i) => (i - 2) * 30, stagger: 0.1, duration: 1 }, 6.6)
        // Scene 3: slices fan out, then move into juicer
        tl.to('.s-halfL,.s-halfR,.s-drop', { autoAlpha: 0, duration: 0.5 }, 8.2)
          .fromTo('.s-slice', { autoAlpha: 0, x: 0, y: 0, scale: 0.4, rotation: 0 },
            { autoAlpha: 1, scale: (i) => (i % 2 ? 0.8 : 1.1), x: (i) => Math.cos(i * 1.05) * 250, y: (i) => Math.sin(i * 1.05) * 150, rotation: (i) => i * 70, duration: 1.8, stagger: 0.08 }, 8.2)
          .to('.c2', { autoAlpha: 1, duration: 0.6 }, 9.3).to('.c2', { autoAlpha: 0, duration: 0.5 }, 11.2)
          .to(stage, { backgroundColor: '#FFD6A5', duration: 2 }, 9)
          .fromTo('.s-juicer', { autoAlpha: 0, y: -160 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 10.4)
          .to('.s-slice', { x: 0, y: -190, scale: 0.2, autoAlpha: 0, stagger: 0.12, duration: 1.2 }, 11.6)
        // Scene 4: stream, bottle appears and fills
        tl.fromTo('.s-bottle', { autoAlpha: 0, y: 120 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 12)
          .to('.s-stream', { autoAlpha: 1, scaleY: 1, duration: 1 }, 13)
          .to('.s-liquid', { attr: { y: 340 }, duration: 4, ease: 'power1.inOut' }, 13.6)
          .fromTo('.s-bubble', { y: 0, autoAlpha: 0 }, { y: -120, autoAlpha: 0.7, stagger: 0.25, duration: 2 }, 14.5)
          .to('.s-stream', { scaleX: 0.3, duration: 0.8 }, 17)
          .to('.s-stream', { autoAlpha: 0, duration: 0.3 }, 17.8)
          .to('.s-juicer', { autoAlpha: 0, y: -160, duration: 1 }, 17.8)
          .to('.s-liquid', { attr: { y: 344 }, duration: 0.4, yoyo: true, repeat: 1 }, 18)
        // Scene 5: cap, label, shine, showcase
        tl.fromTo('.s-cap', { autoAlpha: 0, y: -150 }, { autoAlpha: 1, y: 0, duration: 1 }, 19)
          .fromTo('.s-cap', { scaleX: 0.9 }, { scaleX: 1, duration: 0.4, yoyo: true, repeat: 1 }, 19.8)
          .to('.s-label', { autoAlpha: 1, scaleX: 1, duration: 1 }, 20.6)
          .to('.s-shine', { x: 140, duration: 1.2 }, 21.6)
          .to('.s-bottle', { scale: 1.12, svgOrigin: '400 400', duration: 1.5 }, 21.6)
          .to(stage, { backgroundColor: '#FF7A1A', duration: 1.5 }, 21.6)
          .to('.c3', { autoAlpha: 1, duration: 0.8 }, 22.2)
          .to({}, { duration: 1 })
      })
    }, root)
    const img = () => ScrollTrigger.refresh(); window.addEventListener('load', img)
    return () => { window.removeEventListener('load', img); mm?.revert(); ctx.revert() }
  }, [root])
}
