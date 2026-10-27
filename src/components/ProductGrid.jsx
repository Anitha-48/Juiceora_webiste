import { useEffect, useRef } from 'react'
import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, onOpen }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('in')
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      element.classList.add('in')
      observer.disconnect()
    }, { threshold: 0.12 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="grid product-grid" ref={ref}>
      {products.map((product, index) => (
        <div className="product-grid-item" key={product.id} style={{ '--card-delay': `${index * 140}ms` }}>
          <ProductCard p={product} onOpen={onOpen} />
        </div>
      ))}
    </div>
  )
}
