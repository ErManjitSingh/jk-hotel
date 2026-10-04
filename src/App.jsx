import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BookingModal from './components/BookingModal'
import { About, Rooms, Amenities, Gallery, Location, Reviews, CTA, Footer, WhatsAppFab } from './components/Sections'

export default function App() {
  const [open, setOpen] = useState(false)
  const [preset, setPreset] = useState(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  const book = (p = null) => { setPreset(p); setOpen(true) }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <Navbar onBook={book} />
      <main>
        <Hero onBook={book} />
        <About />
        <Rooms onBook={book} />
        <Amenities />
        <Gallery />
        <Location />
        <Reviews />
        <CTA onBook={book} />
      </main>
      <Footer />
      <WhatsAppFab />
      <BookingModal open={open} preset={preset} onClose={() => setOpen(false)} />
    </>
  )
}
