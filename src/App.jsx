import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import Benefits from './pages/Benefits.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0); const t = setTimeout(() => ScrollTrigger.refresh(), 300); return () => clearTimeout(t) }, [pathname])
  return (<>
    <a className="skip" href="#main">Skip to content</a>
    <Navbar />
    <main id="main"><Routes>
      <Route path="/" element={<Home />} /><Route path="/about" element={<About />} />
      <Route path="/juices" element={<Products />} /><Route path="/benefits" element={<Benefits />} />
      <Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} />
    </Routes></main>
    <Footer />
  </>)
}
