import { useState } from 'react'
import { submitContact } from '../api.js'

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [feedback, setFeedback] = useState('')

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setFeedback('')
    try {
      const res = await submitContact(form)
      setStatus('success')
      setFeedback(res.message || "Thanks for reaching out! We'll get back to you within 24 hours.")
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setFeedback(err.message)
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <div className="rule"></div>
          <p>Questions, catering enquiries, or feedback — we'd love to hear from you.</p>
        </div>
      </section>

      <section>
        <div className="container contact-grid">
          <div className="contact-info">
            <div className="block">
              <div className="icon-circle">&#128205;</div>
              <div><h4>Visit Us</h4><p>42, Race Course Road, Opposite VOC Park, Coimbatore, Tamil Nadu — 641018</p></div>
            </div>
            <div className="block">
              <div className="icon-circle">&#128222;</div>
              <div><h4>Call Us</h4><p>+91 98765 43210</p></div>
            </div>
            <div className="block">
              <div className="icon-circle">&#9993;</div>
              <div><h4>Email Us</h4><p>hello@brewandflour.com</p></div>
            </div>
            <div className="block">
              <div className="icon-circle">&#128337;</div>
              <div><h4>Opening Hours</h4><p>Mon–Thu: 8 AM–10 PM &middot; Fri–Sat: 8 AM–11 PM &middot; Sun: 9 AM–9 PM</p></div>
            </div>
            <div className="map-wrap" style={{ height: '280px', marginTop: '20px' }}>
              <iframe
                title="Brew & Flour location"
                src="https://www.google.com/maps?q=Race+Course+Road,+Coimbatore,+Tamil+Nadu+641018&output=embed"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="form-wrap" style={{ padding: '36px' }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="cname">Your Name</label>
                <input type="text" id="cname" placeholder="Your name" value={form.name} onChange={update('name')} required />
              </div>
              <div className="form-group">
                <label htmlFor="cemail">Your Email</label>
                <input type="email" id="cemail" placeholder="name@example.com" value={form.email} onChange={update('email')} required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="What's this about?" value={form.subject} onChange={update('subject')} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" placeholder="Write your message here..." value={form.message} onChange={update('message')} required></textarea>
              </div>
              <button type="submit" className="btn btn-gold" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
            {status === 'success' && (
              <div className="form-success" style={{ display: 'block' }}>{feedback}</div>
            )}
            {status === 'error' && (
              <div className="form-success" style={{ display: 'block', background: '#f6dede', color: '#b5493f' }}>
                {feedback}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
