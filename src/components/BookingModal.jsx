import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, MessageCircle, Phone } from 'lucide-react'
import { hotel, rooms, mealPlans, money } from '../data'

const today = () => new Date().toISOString().slice(0, 10)
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10) }
const nightsBetween = (a, b) => Math.max(1, Math.round((new Date(b) - new Date(a)) / 86400000))
const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

export default function BookingModal({ open, preset, onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(null)

  // reset form every time the modal opens
  const initial = useMemo(() => ({
    roomId: preset?.roomId || rooms[0].id,
    checkIn: preset?.checkIn || today(),
    checkOut: preset?.checkOut || addDays(preset?.checkIn || today(), 1),
    guests: preset?.guests || 2,
    rooms: 1,
    meal: 'EP',
    name: '', phone: '', email: '', notes: '',
  }), [preset, open])

  const f = form && open ? form : initial
  const set = (k, v) => setForm({ ...f, [k]: v })
  const room = rooms.find((r) => r.id === f.roomId)
  const nights = nightsBetween(f.checkIn, f.checkOut)
  const subtotal = room.price ? room.price * nights * f.rooms : null
  const tax = room.price ? room.tax * nights * f.rooms : null
  const valid = f.name.trim().length > 1 && /^[0-9+\s-]{10,15}$/.test(f.phone.trim())

  const close = () => { setStep(1); setForm(null); onClose() }

  const message = [
    `*New Booking Request - JK Hotel*`,
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    f.email && `Email: ${f.email}`,
    `Room: ${room.name} x ${f.rooms}`,
    `Check-in: ${fmt(f.checkIn)}`,
    `Check-out: ${fmt(f.checkOut)} (${nights} night${nights > 1 ? 's' : ''})`,
    `Guests: ${f.guests}`,
    `Meal plan: ${mealPlans.find((m) => m.id === f.meal).label}`,
    subtotal ? `Estimated total: ${money(subtotal + tax)} (incl. taxes)` : `Rate: please share best rate`,
    f.notes && `Notes: ${f.notes}`,
  ].filter(Boolean).join('\n')

  const confirm = (e) => {
    e.preventDefault()
    if (!valid) return
    const saved = JSON.parse(localStorage.getItem('jk-bookings') || '[]')
    saved.push({ ...f, createdAt: new Date().toISOString() })
    localStorage.setItem('jk-bookings', JSON.stringify(saved))
    setStep(2)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
          <motion.div
            className="modal__box"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 240 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal__close" onClick={close} aria-label="Close"><X /></button>

            {step === 1 ? (
              <form onSubmit={confirm} className="booking">
                <div className="booking__form">
                  <h3>Book your stay</h3>
                  <p className="muted">Fill in your details - we'll confirm your booking on WhatsApp / phone.</p>

                  <div className="grid2">
                    <label>Room
                      <select value={f.roomId} onChange={(e) => set('roomId', e.target.value)}>
                        {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                      </select>
                    </label>
                    <label>Meal plan
                      <select value={f.meal} onChange={(e) => set('meal', e.target.value)}>
                        {mealPlans.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                      </select>
                    </label>
                    <label>Check-in
                      <input type="date" min={today()} value={f.checkIn} onChange={(e) => {
                        const v = e.target.value
                        setForm({ ...f, checkIn: v, checkOut: v >= f.checkOut ? addDays(v, 1) : f.checkOut })
                      }} />
                    </label>
                    <label>Check-out
                      <input type="date" min={addDays(f.checkIn, 1)} value={f.checkOut} onChange={(e) => set('checkOut', e.target.value)} />
                    </label>
                    <label>Guests
                      <select value={f.guests} onChange={(e) => set('guests', Number(e.target.value))}>
                        {Array.from({ length: room.maxGuests * f.rooms }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </label>
                    <label>Rooms
                      <select value={f.rooms} onChange={(e) => set('rooms', Number(e.target.value))}>
                        {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </label>
                    <label>Full name *
                      <input required placeholder="Your name" value={f.name} onChange={(e) => set('name', e.target.value)} />
                    </label>
                    <label>Phone *
                      <input required placeholder="+91 98765 43210" value={f.phone} onChange={(e) => set('phone', e.target.value)} />
                    </label>
                  </div>
                  <label>Email (optional)
                    <input type="email" placeholder="you@example.com" value={f.email} onChange={(e) => set('email', e.target.value)} />
                  </label>
                  <label>Special requests
                    <textarea rows="2" placeholder="Early check-in, extra bed, airport pick-up..." value={f.notes} onChange={(e) => set('notes', e.target.value)} />
                  </label>
                </div>

                <aside className="booking__summary">
                  <img src={room.images[0]} alt={room.name} />
                  <h4>{room.name}</h4>
                  <div className="row"><span>{fmt(f.checkIn)} → {fmt(f.checkOut)}</span></div>
                  <div className="row"><span>{nights} night{nights > 1 ? 's' : ''} · {f.rooms} room{f.rooms > 1 ? 's' : ''} · {f.guests} guest{f.guests > 1 ? 's' : ''}</span></div>
                  <hr />
                  {subtotal ? (
                    <>
                      <div className="row"><span>Room charges</span><b>{money(subtotal)}</b></div>
                      <div className="row"><span>Taxes & fees</span><b>{money(tax)}</b></div>
                      <div className="row total"><span>Estimated total</span><b>{money(subtotal + tax)}</b></div>
                    </>
                  ) : (
                    <div className="row"><span>Rate</span><b>On request</b></div>
                  )}
                  <small>Pay at the hotel. Meal plans are charged extra as per the hotel's tariff. Check-in {hotel.checkIn}, check-out {hotel.checkOut}.</small>
                  <button className="btn btn--gold btn--block" type="submit" disabled={!valid}>Confirm Booking Request</button>
                </aside>
              </form>
            ) : (
              <motion.div className="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
                  <CheckCircle2 size={72} color="#2e9e5b" />
                </motion.div>
                <h3>Request received, {f.name.split(' ')[0]}!</h3>
                <p>
                  Your request for <b>{room.name}</b> ({fmt(f.checkIn)} - {fmt(f.checkOut)}) is saved.
                  Tap below to send it to the hotel on WhatsApp so they can confirm it right away.
                </p>
                <a className="btn btn--whatsapp btn--lg" target="_blank" rel="noreferrer"
                  href={`https://wa.me/${hotel.phoneRaw}?text=${encodeURIComponent(message)}`}>
                  <MessageCircle size={18} /> Send on WhatsApp
                </a>
                <a className="btn btn--ghost" href={`tel:+${hotel.phoneRaw}`}><Phone size={16} /> Or call {hotel.phone}</a>
                <button className="link" onClick={close}>Close</button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
