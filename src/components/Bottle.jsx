export const BOTTLE_PATH = 'M370,250 h60 v40 c0,20 40,30 40,70 v180 c0,15 -10,25 -25,25 h-90 c-15,0 -25,-10 -25,-25 v-180 c0,-40 40,-50 40,-70 z'
export default function Bottle({ p, className = '' }) {
  const id = 'b' + p.id
  return (<svg className={className} viewBox="300 220 200 360" role="img" aria-label={`${p.name} juice bottle (illustration)`}>
    <defs><clipPath id={id}><path d={BOTTLE_PATH} /></clipPath>
      <linearGradient id={id + 'g'} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={p.color} /><stop offset="1" stopColor={p.deep} /></linearGradient></defs>
    <path d={BOTTLE_PATH} fill="rgba(255,255,255,.55)" />
    <g clipPath={`url(#${id})`}><rect x="300" y="330" width="200" height="260" fill={`url(#${id}g)`} /><rect x="345" y="300" width="16" height="260" fill="#fff" opacity=".3" /></g>
    <path d={BOTTLE_PATH} fill="none" stroke="#20251F" strokeOpacity=".35" strokeWidth="3" />
    <rect x="368" y="230" width="64" height="24" rx="6" fill="#286B45" />
    <rect x="345" y="420" width="110" height="90" rx="8" fill="#FFF8EC" />
    <text x="400" y="458" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="19" fill="#286B45">JUICORA</text>
    <text x="400" y="480" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fill={p.label}>{p.name.toUpperCase()}</text>
  </svg>)
}
