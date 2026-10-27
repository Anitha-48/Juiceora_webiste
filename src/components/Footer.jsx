import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
export default function Footer() {
  return (<footer className="footer">
    <div className="fgrid">
      <div><div className="logo">JUI<span>C</span>ORA</div><p>Fruit-inspired juices for every moment. JUICORA is a fictional demo brand.</p></div>
      <div><h3>Explore</h3><Link to="/about">About</Link><Link to="/juices">Juices</Link><Link to="/benefits">Benefits</Link><Link to="/contact">Contact</Link></div>
      <div><h3>Flavours</h3>{products.map(p => <Link key={p.id} to={`/juices?p=${p.id}`}>{p.name}</Link>)}</div>
      <div><h3>Contact (demo)</h3><p>hello@juicora.example<br />+00 000 000 0000<br />123 Demo Street</p>
        <p><a href="https://instagram">Instagram</a> · <a href="https://facebook">Facebook</a> · <a href="https://x.com">X</a></p></div>
    </div>
    <p className="copy">© {new Date().getFullYear()} JUICORA (demo). All content is placeholder.</p>
  </footer>)
}
