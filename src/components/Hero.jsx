import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Star, MapPin, ChevronDown, CalendarDays, Users } from 'lucide-react'
import { hotel, gallery } from '../data'

const slides = [gallery[0], gallery[3], gallery[1], gallery[5]]
const today = () => new Date().toISOString().slice(0, 10)
const addDays = (d, n) => {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x.toISOString().slice(0, 10)
}

export default function Hero({ onBook }) {
  const [i, setI] = useState(0)
  const [checkIn, setCheckIn] = useState(today())
  const [checkOut, setCheckOut] = useState(addDays(today(), 1))
  const [guests, setGuests] = useState(2)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 150])

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    onBook({ checkIn, checkOut, guests })
  }

  return (
    <section id="home" className="hero">
      <motion.div className="hero__bg" style={{ y }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={i}
            src={slides[i]}
            alt="JK Hotel Dharamshala"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="hero__overlay" />

      <div className="container hero__content">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MapPin size={15} /> Khaniyara, Dharamshala, Himachal Pradesh
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          Wake up to the <span>Dhauladhar</span> mountains
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
        >
          Warm hospitality, mountain-view rooms and a peaceful base for exploring Dharamshala & McLeod Ganj.
        </motion.p>

        <motion.div
          className="hero__rating"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {[...Array(5)].map((_, k) => (
            <Star key={k} size={16} fill={k < 4 ? '#e0b45a' : 'none'} color="#e0b45a" />
          ))}
          <span>{hotel.rating}/5 · {hotel.reviewCount} guest reviews</span>
        </motion.div>

        <motion.form
          className="searchbar"
          onSubmit={submit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <label>
            <span><CalendarDays size={14} /> Check-in</span>
            <input type="date" min={today()} value={checkIn} onChange={(e) => {
              setCheckIn(e.target.value)
              if (e.target.value >= checkOut) setCheckOut(addDays(e.target.value, 1))
            }} />
          </label>
          <label>
            <span><CalendarDays size={14} /> Check-out</span>
            <input type="date" min={addDays(checkIn, 1)} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </label>
          <label>
            <span><Users size={14} /> Guests</span>
            <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
            </select>
          </label>
          <button className="btn btn--gold btn--lg" type="submit">Check Availability</button>
        </motion.form>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <ChevronDown />
      </a>
    </section>
  )
}
