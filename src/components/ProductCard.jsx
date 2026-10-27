import ProductImage from './ProductImage.jsx'
export default function ProductCard({ p, onOpen }) {
  return (<article className="card pcard" style={{ '--c': p.color }}>
    <ProductImage product={p} />
    <h3>{p.name}</h3><p>{p.desc}</p>
    <div className="prow"><strong>${p.price.toFixed(2)} <small>demo</small></strong>
      <button className="btn small" onClick={() => onOpen(p)}>Explore Flavour</button></div>
  </article>)
}
