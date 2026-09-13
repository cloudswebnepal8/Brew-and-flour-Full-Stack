import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo">Brew & Flour</div>
            <p>Fresh coffee. Fresh bake. Every day. Coimbatore's cozy corner for specialty coffee and in-house French bakery.</p>
            <div className="footer-social">
              <a href="#">&#128247;</a>
              <a href="#">&#128488;</a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Our Menu</Link></li>
              <li><Link to="/about">About Story</Link></li>
              <li><Link to="/gallery">Visual Gallery</Link></li>
              <li><Link to="/reserve">Reserve Table</Link></li>
              <li><Link to="/contact">Contact Information</Link></li>
              <li><Link to="/order">Order Online</Link></li>
              <li><Link to="/blog">Our Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4>Hours</h4>
            <div className="hours-row"><span>Monday</span><span>8:00 AM - 10:00 PM</span></div>
            <div className="hours-row"><span>Tuesday</span><span>8:00 AM - 10:00 PM</span></div>
            <div className="hours-row"><span>Wednesday</span><span>8:00 AM - 10:00 PM</span></div>
            <div className="hours-row"><span>Thursday</span><span>8:00 AM - 10:00 PM</span></div>
            <div className="hours-row"><span>Friday</span><span>8:00 AM - 11:00 PM</span></div>
            <div className="hours-row"><span>Saturday</span><span>8:00 AM - 11:00 PM</span></div>
            <div className="hours-row"><span>Sunday</span><span>9:00 AM - 9:00 PM</span></div>
          </div>
          <div>
            <h4>Contact</h4>
            <div className="contact-row">&#128205; 42, Race Course Road, Opposite VOC Park, Coimbatore — 641018</div>
            <div className="contact-row">&#128222; +91 98765 43210</div>
            <div className="contact-row">&#128172; <a href="#" className="whatsapp">Chat on WhatsApp</a></div>
            <div className="contact-row">&#9993; hello@brewandflour.com</div>
          </div>
        </div>
        <div className="footer-bottom">
          <span><b>4.8&#9733;</b> Google Rating — 340+ reviews and counting.</span>
          <span>&copy; 2026 Brew & Flour, Coimbatore. Built as a portfolio piece by <b>Safr Labs</b> — Tamil Nadu's digital studio.</span>
        </div>
      </div>
    </footer>
  )
}
