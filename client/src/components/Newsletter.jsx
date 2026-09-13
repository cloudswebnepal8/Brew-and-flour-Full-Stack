import { useState } from 'react'
import { subscribeNewsletter } from '../api.js'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const res = await subscribeNewsletter(email)
      setStatus('success')
      setMessage(res.message || 'Thanks for joining the Brew Club!')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  return (
    <section className="newsletter">
      <div className="container">
        <h2>Join the Brew Club & Get a Free Croissant</h2>
        <p>Sign up today and get a fresh, warm croissant on your first visit, plus early access to seasonal specials and weekend live events.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email">Your Email Address</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-dark" disabled={status === 'loading'}>
            {status === 'loading' ? 'Joining…' : 'Join Free'}
          </button>
          <p className="fine">No spam. Just good coffee news once a month.</p>
          {status === 'success' && (
            <p className="success" style={{ display: 'block' }}>{message}</p>
          )}
          {status === 'error' && (
            <p className="success" style={{ display: 'block', color: '#b5493f' }}>{message}</p>
          )}
        </form>
      </div>
    </section>
  )
}
