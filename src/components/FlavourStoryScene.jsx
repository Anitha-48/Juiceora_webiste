import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BOTTLE_PATH } from './Bottle.jsx'

gsap.registerPlugin(ScrollTrigger)

const artwork = {
  mango: {
    name: 'Mango Glow',
    fruit: 'mango',
    color: '#F5B301',
    deep: '#E8890C',
    line: '#B8650A',
    note: 'Golden, soft and unmistakably tropical.',
  },
  strawberry: {
    name: 'Strawberry Bliss',
    fruit: 'strawberry',
    color: '#E5314F',
    deep: '#B81E3A',
    line: '#8F1830',
    note: 'A rosy berry note with a juicy little lift.',
  },
  pineapple: {
    name: 'Pineapple Splash',
    fruit: 'pineapple',
    color: '#F2D024',
    deep: '#C9A100',
    line: '#8A6D00',
    note: 'Bright, tangy sunshine with a tropical twist.',
  },
}

function FruitIllustration({ kind, color, deep, line, id }) {
  if (kind === 'mango') {
    return (
      <g className="flavor-fruit">
        <path d="M-72 42C-104-8-59-92 1-92c56 0 87 49 66 101-17 43-67 80-98 68-17-6-27-19-41-35Z" fill={`url(#${id}-fruit)`} stroke={line} strokeWidth="3" />
        <path d="M-5-89c18-18 40-21 57-14-15 16-31 23-56 23Z" fill="#286B45" />
        <path d="M-45-35c18-26 43-39 70-37" fill="none" stroke="#fff" strokeOpacity=".48" strokeWidth="10" strokeLinecap="round" />
        <path d="M52 74c18 12 40 12 54 4" fill="none" stroke={deep} strokeWidth="5" strokeLinecap="round" />
      </g>
    )
  }
  if (kind === 'strawberry') {
    return (
      <g className="flavor-fruit">
        <path d="M0-58C-28-93-89-78-86-30c2 42 46 99 86 128 40-29 84-86 86-128 3-48-58-63-86-28Z" fill={`url(#${id}-fruit)`} stroke={line} strokeWidth="3" />
        <path d="M-39-68-58-101-21-85-3-113 13-85 51-100 37-66 64-80 51-48C25-56-22-55-46-46Z" fill="#286B45" />
        {[-48, -20, 15, 45].map((x, i) => <ellipse key={`seed-${x}`} cx={x} cy={-25 + (i % 2) * 13} rx="3" ry="6" transform={`rotate(${x / 2} ${x} ${-25 + (i % 2) * 13})`} fill="#FFE7A6" />)}
        {[-34, 0, 34].map((x, i) => <ellipse key={`seed-low-${x}`} cx={x} cy={24 + (i % 2) * 11} rx="3" ry="6" fill="#FFE7A6" />)}
      </g>
    )
  }
  return (
    <g className="flavor-fruit">
      <path d="M-43-72-71-129-31-99-6-145 12-99 52-132 41-72" fill="#286B45" stroke="#1D4F33" strokeWidth="4" strokeLinejoin="round" />
      <path d="M-75-57Q0-96 75-57L62 61Q0 107-62 61Z" fill={`url(#${id}-fruit)`} stroke={line} strokeWidth="3" />
      {[-43, -14, 14, 43].map((x, i) => <path key={x} d={`M${x - 14} ${-44 + (i % 2) * 12}l14-9 14 9-14 18Z M${x - 14} ${-44 + (i % 2) * 12}l14 9 14-9`} fill="none" stroke={line} strokeOpacity=".65" strokeWidth="3" />)}
      {[-30, 0, 30].map(x => <path key={`low-${x}`} d={`M${x - 14} 18l14-9 14 9-14 18Z M${x - 14} 18l14 9 14-9`} fill="none" stroke={line} strokeOpacity=".65" strokeWidth="3" />)}
      <path d="M-42-46c20-15 43-20 63-17" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="8" strokeLinecap="round" />
    </g>
  )
}

function FruitPiece({ flavour, id }) {
  if (flavour.fruit === 'mango') {
    return (
      <g>
        <path d="M-30 7C-19-21 13-35 31-20c15 13 5 39-16 49C-5 39-24 28-30 7Z" fill={`url(#${id}-fruit)`} stroke={flavour.line} strokeWidth="3" />
        <path d="M-19 5C-10-13 10-23 22-14c8 7 2 23-12 31C-2 22-14 15-19 5Z" fill="#FFD66B" />
        <path d="M-16-3c9-10 19-14 27-14" fill="none" stroke="#FFF3C4" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  }
  if (flavour.fruit === 'strawberry') {
    return (
      <g>
        <path d="M0-28C-14-45-37-32-31-12-27 4-9 25 0 31 9 25 27 4 31-12c6-20-17-33-31-16Z" fill={`url(#${id}-fruit)`} stroke={flavour.line} strokeWidth="3" />
        {[-13, 0, 13].map((x, i) => <ellipse key={x} cx={x} cy={-8 + (i % 2) * 11} rx="2" ry="4" fill="#FFE7A6" />)}
        <path d="M-12-31-17-39-5-35 0-43 5-35 17-39 12-30" fill="#286B45" />
      </g>
    )
  }
  if (flavour.fruit === 'pineapple') {
    return (
      <g>
        <path d="m-28-21 35-12 25 20-7 34-35 12-25-20Z" fill={`url(#${id}-fruit)`} stroke={flavour.line} strokeWidth="3" />
        <path d="m-28-21 25 20 35-12M-3-1l-7 34M-3-1l28 21" fill="none" stroke={flavour.line} strokeWidth="3" />
      </g>
    )
  }
  return (
    <g>
      <circle r="29" fill={`url(#${id}-fruit)`} stroke={flavour.line} strokeWidth="3" />
      <circle r="20" fill="#FFF1D6" opacity=".8" />
      <circle r="10" fill={flavour.color} opacity=".78" />
      {[0, 60, 120].map((angle) => <path key={angle} d="M0 0v-19" stroke="#FFF1D6" strokeWidth="2" transform={`rotate(${angle})`} />)}
    </g>
  )
}

function FlavourArtwork({ flavour, id }) {
  const pieces = [-1, 0, 1]
  return (
    <svg className="flavour-artwork" viewBox="0 0 800 560" role="img" aria-label={`Layered vector illustration of ${flavour.name} fruit becoming a juice bottle`}>
      <defs>
        <linearGradient id={`${id}-fruit`} x1="0" x2="1" y1="0" y2="1"><stop stopColor={flavour.color} /><stop offset="1" stopColor={flavour.deep} /></linearGradient>
        <linearGradient id={`${id}-juice`} x1="0" x2="0" y1="0" y2="1"><stop stopColor={flavour.color} /><stop offset="1" stopColor={flavour.deep} /></linearGradient>
        <clipPath id={`${id}-bottle`}><path d={BOTTLE_PATH} /></clipPath>
      </defs>
      <ellipse cx="402" cy="477" rx="244" ry="19" fill="#20251F" opacity=".12" />
      <g className="flavour-fruit-wrap" transform="translate(270 285)">
        <FruitIllustration kind={flavour.fruit} color={flavour.color} deep={flavour.deep} line={flavour.line} id={id} />
      </g>
      <g className="flavour-pieces" transform="translate(270 285)">
        {pieces.map((direction, i) => (
          <g className="flavour-piece" key={direction} transform={`translate(${direction * 44} ${i === 1 ? 62 : -25}) rotate(${direction * 22})`}>
            <FruitPiece flavour={flavour} id={id} />
          </g>
        ))}
      </g>
      <g className="flavour-pour">
        <path d="M390 284C452 280 475 294 531 310" fill="none" stroke={flavour.color} strokeWidth="8" strokeLinecap="round" strokeDasharray="9 15" />
        {[0, 1, 2, 3].map(i => <circle key={i} className="flavour-drop" cx={428 + i * 24} cy={276 + i * 9} r={5 + i % 2 * 2} fill={flavour.color} />)}
      </g>
      <g className="flavour-bottle-wrap" transform="translate(230 -85) scale(.98)">
        <g className="flavour-bottle">
          <path d={BOTTLE_PATH} fill="rgba(255,255,255,.6)" />
          <g clipPath={`url(#${id}-bottle)`}>
            <rect className="flavour-liquid" x="300" y="565" width="200" height="260" fill={`url(#${id}-juice)`} />
            <path d="M349 285h16v265h-16Z" fill="#fff" opacity=".32" />
            {[0, 1, 2, 3].map(i => <circle className="flavour-bubble" key={i} cx={376 + i * 13} cy={535 - i * 13} r={3 + i % 2} fill="#fff" />)}
          </g>
          <path d={BOTTLE_PATH} fill="none" stroke="#20251F" strokeOpacity=".38" strokeWidth="3" />
          <rect x="368" y="230" width="64" height="24" rx="6" fill="#286B45" />
          <rect x="345" y="420" width="110" height="90" rx="8" fill="#FFF8EC" />
          <text x="400" y="458" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="19" fill="#286B45">JUICORA</text>
          <text x="400" y="480" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fill={flavour.line}>{flavour.name.toUpperCase()}</text>
        </g>
      </g>
    </svg>
  )
}

export default function FlavourStoryScene({ id }) {
  const root = useRef(null)
  const flavour = artwork[id]
  const sceneId = `flavour-${id}`

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
          gsap.set(select('.flavour-fruit-wrap,.flavour-piece,.flavour-pour,.flavour-drop'), { autoAlpha: 0 })
          gsap.set(select('.flavour-liquid'), { attr: { y: 340 } })
          gsap.set(select('.flavour-bottle'), { autoAlpha: 1 })
          return
        }

        gsap.set(select('.flavour-piece,.flavour-pour,.flavour-drop,.flavour-bottle'), { autoAlpha: 0 })
        gsap.set(select('.flavour-liquid'), { attr: { y: 565 } })
        gsap.set(select('.flavour-bubble'), { autoAlpha: 0 })

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: small ? '+=170%' : '+=240%',
            scrub: 0.65,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        timeline.fromTo(select('.flavour-fruit-wrap'), { scale: .65, rotation: -16 }, { scale: 1, rotation: 8, duration: 2 })
          .to(select('.flavour-fruit-wrap'), { x: -55, scale: .72, autoAlpha: 0, duration: 1 }, 2)
          .fromTo(select('.flavour-piece'), { x: -70, y: 20, scale: .4, autoAlpha: 0 }, {
            x: (i) => 160 + i * 24, y: (i) => -35 + i * 36, scale: .9, autoAlpha: 1, stagger: .12, duration: 1.8,
          }, 2.3)
          .fromTo(select('.flavour-bottle'), { y: 55, scale: .8, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 1.3 }, 3.2)
          .fromTo(select('.flavour-pour'), { autoAlpha: 0 }, { autoAlpha: 1, duration: .4 }, 3.8)
          .fromTo(select('.flavour-drop'), { y: -15, autoAlpha: 0 }, { y: 52, autoAlpha: 1, stagger: .08, duration: .9 }, 3.8)
          .to(select('.flavour-liquid'), { attr: { y: 340 }, duration: 2.4, ease: 'power1.inOut' }, 4)
          .fromTo(select('.flavour-bubble'), { y: 10, autoAlpha: 0 }, { y: -55, autoAlpha: .65, stagger: .18, duration: 1.4 }, 4.2)
          .to(select('.flavour-pieces,.flavour-pour,.flavour-drop'), { autoAlpha: 0, duration: .7 }, 5.1)
          .to(select('.flavour-bottle'), { scale: 1.07, duration: 1 }, 5.3)
          .to({}, { duration: .6 })

        return () => timeline.scrollTrigger?.kill()
      })
    }, root)
    return () => {
      media?.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section className={`flavour-scene flavour-${id}`} ref={root} style={{ '--flavour': flavour.color, '--flavour-deep': flavour.deep }} aria-label={`${flavour.name} flavour story`}>
      <div className="flavour-copy">
        <p className="kicker">A flavour in the spotlight</p>
        <p className="flavour-number" aria-hidden="true">0{Object.keys(artwork).indexOf(id) + 2}</p>
        <h2>{flavour.name}</h2>
        <p>{flavour.note}</p>
        <span className="flavour-caption">A playful, layered fruit illustration — brought to life as you scroll.</span>
      </div>
      <div className="flavour-art"><FlavourArtwork flavour={flavour} id={sceneId} /></div>
      <span className="scene-scroll-note" aria-hidden="true">Scroll to explore ↓</span>
    </section>
  )
}
