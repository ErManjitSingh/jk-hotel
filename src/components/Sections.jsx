import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import {
  Wifi, Car, UtensilsCrossed, ConciergeBell, Zap, Snowflake, ShieldCheck, Plane, Map as MapIcon, Ban, MessageCircle,
  Bed, Maximize, Users, Mountain, Check, ChevronLeft, ChevronRight, MapPin, Phone, Mail, Clock, Star, X, Navigation,
} from 'lucide-react'
import Reveal, { SectionTitle } from './Reveal'
import { hotel, rooms, amenities, attractions, reviews, gallery, money } from '../data'

const Icons = { Wifi, Car, UtensilsCrossed, ConciergeBell, Clock, Zap, Snowflake, ShieldCheck, Plane, Map: MapIcon, Ban, Users, Check }

/* ---------- Counter ---------- */
function Counter({ to, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, onUpdate: (v) => setVal(v) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>
}

/* ---------- About ---------- */
export function About() {
  return (
    <section id="about" className="section">
      <div className="container about">
        <Reveal x={-60} className="about__images">
          <img className="about__img1" src={gallery[2]} alt="JK Hotel exterior" />
          <img className="about__img2" src={gallery[6]} alt="JK Hotel interior" />
          <div className="about__badge"><strong>Since</strong><span>Khaniyara</span></div>
        </Reveal>
        <Reveal x={60}>
          <span className="eyebrow">Welcome to JK Hotel</span>
          <h2 className="about__title">A serene getaway in the hills of Himachal</h2>
          <p>
            JK Hotel is a peaceful retreat in Khaniyara, Dharamshala, known for warm hospitality and well-appointed
            rooms with views of the surrounding mountains and lush landscapes. Each room blends modern comfort with
            traditional charm.
          </p>
          <p>
            Enjoy local and international dishes at our on-site restaurant, relax in the inviting common areas, and let
            our team help you plan treks, temple visits and sightseeing. Perfect for families, couples and solo travellers.
          </p>
          <div className="stats">
            <div><b><Counter to={4} suffix=".0" decimals={0} /></b><span>Guest rating</span></div>
            <div><b><Counter to={3} /></b><span>Room types</span></div>
            <div><b>24/7</b><span>Front desk</span></div>
            <div><b><Counter to={10} suffix=" km" /></b><span>To McLeod Ganj</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Rooms ---------- */
function RoomCard({ room, index, onBook }) {
  const [img, setImg] = useState(0)
  const n = room.images.length
  return (
    <Reveal delay={index * 0.15}>
      <motion.article className="room" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 250 }}>
        <div className="room__media">
          <AnimatePresence mode="wait">
            <motion.img
              key={img}
              src={room.images[img]}
              alt={room.name}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <button className="room__arrow room__arrow--l" onClick={() => setImg((img - 1 + n) % n)} aria-label="Previous"><ChevronLeft size={18} /></button>
          <button className="room__arrow room__arrow--r" onClick={() => setImg((img + 1) % n)} aria-label="Next"><ChevronRight size={18} /></button>
          <div className="room__dots">{room.images.map((_, k) => <i key={k} className={k === img ? 'on' : ''} />)}</div>
        </div>
        <div className="room__body">
          <h3>{room.name}</h3>
          <div className="room__meta">
            <span><Bed size={15} /> {room.bed}</span>
            <span><Maximize size={15} /> {room.size}</span>
            <span><Users size={15} /> {room.guests}</span>
            <span><Mountain size={15} /> {room.view}</span>
          </div>
          <p>{room.description}</p>
          <ul className="room__amen">
            {room.amenities.slice(0, 6).map((a) => <li key={a}><Check size={13} /> {a}</li>)}
          </ul>
          <div className="room__foot">
            <div className="room__price">
              {room.price ? (
                <>
                  <b>{money(room.price)}</b><span> / night</span>
                  <small>+ {money(room.tax)} taxes & fees</small>
                </>
              ) : (
                <>
                  <b className="room__ask">Best rate on request</b>
                  <small>Call or book to get today's price</small>
                </>
              )}
            </div>
            <button className="btn btn--gold" onClick={() => onBook({ roomId: room.id })}>Book Now</button>
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}

export function Rooms({ onBook }) {
  return (
    <section id="rooms" className="section section--tint">
      <div className="container">
        <SectionTitle
          eyebrow="Rooms & Suites"
          title="Stay in comfort, wake up to the mountains"
          text="Every room has a private bathroom, free toiletries and a view of the hills. Choose the one that suits your trip."
        />
        <div className="rooms">
          {rooms.map((r, i) => <RoomCard key={r.id} room={r} index={i} onBook={onBook} />)}
        </div>
      </div>
    </section>
  )
}

/* ---------- Amenities ---------- */
export function Amenities() {
  return (
    <section id="amenities" className="section">
      <div className="container">
        <SectionTitle eyebrow="Amenities" title="Everything you need for a smooth stay" />
        <div className="amen-grid">
          {amenities.map((a, i) => {
            const Icon = Icons[a.icon] || Check
            return (
              <Reveal key={a.title} delay={(i % 4) * 0.08}>
                <motion.div className="amen" whileHover={{ y: -6 }}>
                  <div className="amen__icon"><Icon size={24} /></div>
                  <h4>{a.title}</h4>
                  <p>{a.text}</p>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Gallery ---------- */
export function Gallery() {
  const [open, setOpen] = useState(null)
  const go = (d) => setOpen((o) => (o + d + gallery.length) % gallery.length)

  useEffect(() => {
    if (open === null) return
    const h = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open])

  return (
    <section id="gallery" className="section section--dark">
      <div className="container">
        <SectionTitle eyebrow="Gallery" title="A glimpse of JK Hotel" />
        <div className="gallery">
          {gallery.map((src, i) => (
            <Reveal key={src} delay={(i % 3) * 0.1} className={`gallery__item g${i}`}>
              <motion.img whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} src={src} alt={`JK Hotel ${i + 1}`} loading="lazy" onClick={() => setOpen(i)} />
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <button className="lightbox__close" onClick={() => setOpen(null)}><X /></button>
            <button className="lightbox__nav l" onClick={(e) => { e.stopPropagation(); go(-1) }}><ChevronLeft /></button>
            <motion.img key={open} src={gallery[open]} alt="" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} />
            <button className="lightbox__nav r" onClick={(e) => { e.stopPropagation(); go(1) }}><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ---------- Location ---------- */
export function Location() {
  const map = `https://maps.google.com/maps?q=${hotel.lat},${hotel.lng}&z=14&output=embed`
  return (
    <section id="location" className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Location"
          title="Khaniyara, Dharamshala"
          text="Quietly tucked away from the crowds, yet a short drive from Dharamshala's best sights."
        />
        <div className="location">
          <Reveal x={-50}>
            <div className="location__card">
              <p><MapPin size={18} /> {hotel.address}</p>
              <p><Phone size={18} /> <a href={`tel:+${hotel.phoneRaw}`}>{hotel.phone}</a></p>
              <p><Mail size={18} /> <a href={`mailto:${hotel.email}`}>{hotel.email}</a></p>
              <p><Clock size={18} /> Check-in {hotel.checkIn} · Check-out {hotel.checkOut}</p>
              <a className="btn btn--gold" target="_blank" rel="noreferrer"
                href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.lat},${hotel.lng}`}>
                <Navigation size={16} /> Get Directions
              </a>
              <h4>Nearby</h4>
              <ul className="near">
                {attractions.map((a) => (
                  <li key={a.name}><div><b>{a.name}</b><small>{a.text}</small></div><span>{a.distance}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal x={50}>
            <iframe className="map" title="JK Hotel map" src={map} loading="lazy" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- Reviews ---------- */
export function Reviews() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % reviews.length), 5000)
    return () => clearInterval(t)
  }, [])
  const r = reviews[i]
  return (
    <section id="reviews" className="section section--tint">
      <div className="container">
        <SectionTitle eyebrow="Guest Reviews" title={`Rated ${hotel.rating}/5 by our guests`} />
        <Reveal className="review-wrap">
          <AnimatePresence mode="wait">
            <motion.div key={i} className="review" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
              <div className="review__stars">{[...Array(5)].map((_, k) => <Star key={k} size={20} fill={k < r.rating ? '#e0b45a' : 'none'} color="#e0b45a" />)}</div>
              <p>“{r.text}”</p>
              <b>- {r.name}</b>
            </motion.div>
          </AnimatePresence>
          <div className="review__dots">{reviews.map((_, k) => <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Review ${k + 1}`} />)}</div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- CTA + Footer ---------- */
export function CTA({ onBook }) {
  return (
    <section className="cta">
      <img src={gallery[4]} alt="" />
      <div className="cta__overlay" />
      <Reveal className="cta__inner">
        <h2>Ready for your Himalayan escape?</h2>
        <p>Book directly with us for the best service and a warm welcome.</p>
        <button className="btn btn--gold btn--lg" onClick={() => onBook()}>Book Your Stay</button>
      </Reveal>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="logo logo--light"><span className="logo__mark">JK</span><span className="logo__text">Hotel<small>Dharamshala</small></span></div>
          <p>{hotel.tagline}. Comfortable rooms, tasty food and warm hospitality in Khaniyara, Dharamshala.</p>
        </div>
        <div>
          <h4>Quick links</h4>
          {['About', 'Rooms', 'Amenities', 'Gallery', 'Location', 'Reviews'].map((l) => <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>)}
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`tel:+${hotel.phoneRaw}`}>{hotel.phone}</a>
          <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
          <span>{hotel.address}</span>
        </div>
      </div>
      <div className="footer__bottom">© {new Date().getFullYear()} JK Hotel, Khaniyara, Dharamshala. All rights reserved.</div>
    </footer>
  )
}

export function WhatsAppFab() {
  return (
    <motion.a
      className="fab"
      href={`https://wa.me/${hotel.phoneRaw}?text=${encodeURIComponent('Hello JK Hotel, I would like to know about room availability.')}`}
      target="_blank" rel="noreferrer"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }} aria-label="WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.a>
  )
}
