import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { hotel } from '../data'

const links = [
  ['About', '#about'],
  ['Rooms', '#rooms'],
  ['Amenities', '#amenities'],
  ['Gallery', '#gallery'],
  ['Location', '#location'],
  ['Reviews', '#reviews'],
]

export default function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--solid' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="container nav__inner">
        <a href="#home" className="logo">
          <span className="logo__mark">JK</span>
          <span className="logo__text">Hotel<small>Dharamshala</small></span>
        </a>

        <nav className="nav__links">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="nav__phone" href={`tel:${hotel.phone.replace(/\s/g, '')}`}>
            <Phone size={16} /> {hotel.phone}
          </a>
          <button className="btn btn--gold" onClick={() => onBook()}>Book Now</button>
          <button className="nav__burger" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <button className="btn btn--gold" onClick={() => { setOpen(false); onBook() }}>Book Now</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
