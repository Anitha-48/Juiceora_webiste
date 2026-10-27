import { useRef } from 'react'
import useBottleStory from '../animations/useBottleStory.js'
import { BOTTLE_PATH } from './Bottle.jsx'
const SEG = (n, r, off = 0) => Array.from({ length: n }, (_, i) => { const a = off + (i * 2 * Math.PI) / n; return [Math.cos(a) * r, Math.sin(a) * r] })
const Slice = () => (<g className="s-slice"><circle r="70" fill="#F4511E" /><circle r="62" fill="#FFB347" />
  {SEG(8, 62).map(([x, y], i) => <line key={i} x1="0" y1="0" x2={x} y2={y} stroke="#FFF1D6" strokeWidth="3" />)}<circle r="8" fill="#FFF1D6" /></g>)
const Half = ({ side }) => { const s = side === 'L' ? -1 : 1; const arc = side === 'L' ? 0 : 1
  return (<g className={`s-half${side}`}><path d={`M0,-90 A90,90 0 0 ${arc} 0,90 Z`} fill="#F4511E" /><path d={`M0,-80 A80,80 0 0 ${arc} 0,80 Z`} fill="#FFB347" />
    {[-60, -30, 0, 30, 60].map(d => { const a = (d * Math.PI) / 180; return <line key={d} x1="0" y1="0" x2={s * Math.cos(a) * 80} y2={Math.sin(a) * 80} stroke="#FFF1D6" strokeWidth="3" /> })}
    <path d={`M0,-90 L0,90`} stroke="#FFF1D6" strokeWidth="2" /></g>) }
export default function StoryScene() {
  const root = useRef(null)
  useBottleStory(root)
  return (<section className="stage" ref={root} aria-label="From fruit to bottle: scroll to watch the journey">
    <svg className="scene" viewBox="0 0 800 600" role="img" aria-label="Animated illustration: an orange is cut, juiced and bottled">
      <defs><clipPath id="bc"><path d={BOTTLE_PATH} /></clipPath>
        <radialGradient id="og" cx=".35" cy=".3"><stop offset="0" stopColor="#FFA24D" /><stop offset="1" stopColor="#F4511E" /></radialGradient>
        <linearGradient id="jg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#FF9A33" /><stop offset="1" stopColor="#F4511E" /></linearGradient></defs>
      <ellipse cx="400" cy="575" rx="150" ry="10" fill="#20251F" opacity=".15" />
      <g transform="translate(400 300)">
        <g className="s-orange"><circle r="90" fill="url(#og)" /><ellipse cx="-30" cy="-35" rx="22" ry="12" fill="#fff" opacity=".35" transform="rotate(-30 -30 -35)" />
          <g className="leaf"><ellipse cx="14" cy="-96" rx="26" ry="10" fill="#286B45" transform="rotate(-25 14 -96)" /></g></g>
        <Half side="L" /><Half side="R" />
        {Array.from({ length: 6 }, (_, i) => <Slice key={i} />)}
        {[0, 1, 2, 3, 4].map(i => <circle key={i} className="s-drop" r="5" fill="#FF9A33" />)}
        <g className="s-knife"><rect x="-10" y="-230" width="20" height="90" rx="6" fill="#20251F" />
          <polygon points="-34,-140 34,-140 34,-60 0,-36 -34,-60" fill="#D9DEDA" stroke="#9AA39D" strokeWidth="2" /></g>
      </g>
      <g className="s-juicer" transform="translate(400 110)"><path d="M-100,-60 L100,-60 L70,10 L-70,10 Z" fill="#286B45" /><rect x="-60" y="10" width="120" height="30" rx="8" fill="#1d4f33" /><rect x="-6" y="38" width="12" height="12" fill="#1d4f33" /></g>
      <rect className="s-stream" x="396" y="150" width="8" height="415" rx="4" fill="#FF8A2A" />
      <g className="s-bottle"><path d={BOTTLE_PATH} fill="rgba(255,255,255,.45)" />
        <g clipPath="url(#bc)"><rect className="s-liquid" x="300" y="340" width="200" height="260" fill="url(#jg)" />
          {[350, 385, 420, 445].map((x, i) => <circle key={x} className="s-bubble" cx={x} cy={540 - i * 10} r={3 + (i % 2) * 2} fill="#fff" />)}
          <rect className="s-shine" x="345" y="290" width="16" height="280" fill="#fff" opacity=".4" /></g>
        <path d={BOTTLE_PATH} fill="none" stroke="#20251F" strokeOpacity=".35" strokeWidth="3" />
        <g className="s-label"><rect x="345" y="425" width="110" height="90" rx="8" fill="#FFF8EC" />
          <text x="400" y="463" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="20" fill="#286B45">JUICORA</text>
          <text x="400" y="485" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fill="#F4511E">ORANGE BURST</text></g>
        <g className="s-cap"><rect x="368" y="230" width="64" height="24" rx="6" fill="#286B45" />{[378, 390, 402, 414].map(x => <line key={x} x1={x} y1="234" x2={x} y2="250" stroke="#1d4f33" strokeWidth="2" />)}</g>
      </g>
    </svg>
    <h2 className="cap c1">Freshness Begins with Nature</h2>
    <h2 className="cap c2">Real Fruit. Real Freshness.</h2>
    <h2 className="cap c3">A Little Sunshine in Every Sip</h2>
  </section>)
}
