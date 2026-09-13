import { useState } from 'react'
import { submitReservation } from '../api.js'

const initialForm = { name: '', phone: '', email: '', date: '', time: '', guests: '', notes: '' }

export default function Reserve() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await submitReservation(form)
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Reserve a Table</h1>
          <div className="rule"></div>
          <p>Save your sunlit corner on Race Course Road. Walk-ins are always welcome too.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="form-wrap">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" placeholder="Your name" value={form.name} onChange={update('name')} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" placeholder="+91 98765 43210" value={form.phone} onChange={update('phone')} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="remail">Email Address</label>
                <input type="email" id="remail" placeholder="name@example.com" value={form.email} onChange={update('email')} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input type="date" id="date" value={form.date} onChange={update('date')} required />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input type="time" id="time" value={form.time} onChange={update('time')} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="guests">Number of Guests</label>
                <select id="guests" value={form.guests} onChange={update('guests')} required>
                  <option value="">Select guests</option>
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5+ Guests</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="notes">Special Requests (optional)</label>
                <textarea id="notes" placeholder="Window seat, birthday cake, dietary needs..." value={form.notes} onChange={update('notes')}></textarea>
              </div>
              <button type="submit" className="btn btn-gold" disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting…' : 'Confirm Reservation'}
              </button>
            </form>
            {status === 'success' && (
              <div className="form-success" style={{ display: 'block' }}>
                Thank you! Your table request has been received — we'll confirm by phone or email shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="form-success" style={{ display: 'block', background: '#f6dede', color: '#b5493f' }}>
                {errorMsg}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
