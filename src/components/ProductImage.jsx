import { useState } from 'react'

const artwork = {
  grapes: (
    <g>
      <path d="M0-78c18 0 31 11 31 28M0-78c-15-14-31-8-36 3" fill="none" stroke="#286B45" strokeWidth="8" strokeLinecap="round" />
      <path d="M-8-77c21-23 53-10 53 4-18 8-38 8-53-4Z" fill="#43864A" />
      {[[0, -38], [-25, -16], [25, -16], [-38, 12], [0, 12], [38, 12], [-25, 42], [25, 42], [0, 70]].map(([x, y], i) => (
        <g key={`${x}-${y}`}><circle cx={x} cy={y} r="23" fill={i % 2 ? '#673D87' : '#55306F'} /><ellipse cx={x - 6} cy={y - 8} rx="6" ry="10" fill="#fff" opacity=".28" /></g>
      ))}
    </g>
  ),
  papaya: (
    <g>
      <path d="M0-78c-45 0-68 49-49 96 13 31 31 55 49 66 18-11 36-35 49-66 19-47-4-96-49-96Z" fill="#F28C28" stroke="#D94C1A" strokeWidth="5" />
      <path d="M0-63c-34 0-50 42-35 79 10 24 24 43 35 51 11-8 25-27 35-51 15-37-1-79-35-79Z" fill="#FFCE56" />
      <ellipse cy="4" rx="20" ry="49" fill="#E86B36" />
      {[-8, 0, 8].map((x, i) => <ellipse key={x} cx={x} cy={-26 + i * 22} rx="3" ry="5" fill="#30221C" />)}
      <path d="M-10-74q10-17 22-19" fill="none" stroke="#286B45" strokeWidth="7" strokeLinecap="round" />
    </g>
  ),
  guava: (
    <g>
      <path d="M0-71c-43-2-68 32-56 69 8 27 30 51 56 75 26-24 48-48 56-75 12-37-13-71-56-69Z" fill="#72A951" stroke="#497D3B" strokeWidth="5" />
      <path d="M0-52c-31-2-49 25-39 53 7 20 24 39 39 54 15-15 32-34 39-54 10-28-8-55-39-53Z" fill="#F2949C" />
      {[-20, 0, 20].map((x, i) => <g key={x}>{[-20, 0, 20].map(y => <circle key={y} cx={x + (i - 1) * 2} cy={y} r="2.5" fill="#F8D9A0" />)}</g>)}
      <path d="M-13-67q12-16 28-12" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".4" />
    </g>
  ),
  'dragon-fruit': (
    <g>
      <path d="M0-82c-42-4-69 27-63 69 5 37 35 68 63 83 28-15 58-46 63-83 6-42-21-73-63-69Z" fill="#D93475" stroke="#9C2452" strokeWidth="5" />
      <path d="M-38-68q-21-30-8-50 23 9 27 39M-9-75q-8-35 10-48 18 19 9 48M21-71q5-34 29-38 10 25-12 46M45-49q20-24 42-14-2 25-35 34M-48-35q-29-12-45 7 10 24 43 19" fill="#66A84F" stroke="#43813C" strokeWidth="4" strokeLinejoin="round" />
      <path d="M0-58c-30-2-49 23-44 52 4 23 25 45 44 57 19-12 40-34 44-57 5-29-14-54-44-52Z" fill="#FFF7F2" />
      {[-25, -10, 7, 24].map((x, i) => <g key={x}>{[-28, -8, 12, 32].map(y => <ellipse key={y} cx={x + (i % 2 ? 3 : -3)} cy={y} rx="2.4" ry="3.5" fill="#332435" />)}</g>)}
      <path d="M-28-40q16-15 35-14" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".5" />
    </g>
  ),
  mango: (
    <g>
      <path d="M-4-74c47-18 83 16 66 62-12 34-44 66-78 76-28-18-48-54-44-87 4-35 27-51 56-51Z" fill="#F5B301" stroke="#D98314" strokeWidth="5" />
      <path d="M-33-37c16-20 40-29 63-24" fill="none" stroke="#FFF3C4" strokeWidth="8" strokeLinecap="round" opacity=".65" />
      <path d="M34-64q20-21 42-14-12 18-39 23Z" fill="#286B45" />
      <path d="M-12 63q21 10 43 0" fill="none" stroke="#E8890C" strokeWidth="5" strokeLinecap="round" />
    </g>
  ),
}

function FruitIllustration({ kind }) {
  return (
    <svg className="product-fruit-art" viewBox="-100 -110 200 220" role="img" aria-label={`${kind} fruit illustration`}>
      <defs>
        <radialGradient id={`fruit-backdrop-${kind}`}><stop stopColor="#fff" /><stop offset="1" stopColor="#FFF3E2" /></radialGradient>
      </defs>
      <circle cy="4" r="96" fill={`url(#fruit-backdrop-${kind})`} />
      <ellipse cy="90" rx="57" ry="9" fill="#20251F" opacity=".1" />
      {artwork[kind]}
    </svg>
  )
}

export default function ProductImage({ product }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="pimg">
      {product.image && !failed
        ? <img className="product-fruit-image" src={product.image} alt={`${product.name} fruit`} loading="lazy" onError={() => setFailed(true)} />
        : <FruitIllustration kind={product.fruitArt || 'mango'} />}
    </div>
  )
}
