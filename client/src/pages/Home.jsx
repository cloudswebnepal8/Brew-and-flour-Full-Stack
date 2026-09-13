import { Link } from 'react-router-dom'
import Newsletter from '../components/Newsletter.jsx'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="eyebrow-dot"><span className="dot"></span> COIMBATORE'S PREMIER SPECIALTY CAFÉ</span>
            <h1>Where Specialty Roast<br /><em>Meets Artisanal Flour</em></h1>
            <p className="lead">An atmospheric sunlit sanctuary on Race Course Road. Bringing world-class espresso craft and warm, flaky French viennoiserie baking to Coimbatore every single morning.</p>
            <div className="hero-ctas">
              <Link to="/reserve" className="btn btn-gold">Reserve a Table &rarr;</Link>
              <Link to="/menu" className="btn btn-outline-dark">Explore Full Menu &#8635;</Link>
            </div>
            <div className="hero-stats">
              <div className="stat"><b>4.8&#9733;</b><span>Google Rating &middot; 340+ reviews</span></div>
              <div className="stat"><b>100%</b><span>In-house Bake &middot; Fresh every morning</span></div>
              <div className="stat"><b>8am</b><span>Open Daily &middot; on Race Course Rd</span></div>
            </div>
          </div>
          <div className="hero-collage">
            <img className="img1" src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80" alt="Barista pulling espresso" />
            <img className="img2" src="https://images.unsplash.com/photo-1481833761820-0509d3217039?w=600&q=80" alt="Sunlit café interior" />
            <img className="img3" src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80" alt="Fresh croissants" />
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          <span>&#9656; TODAY'S SPECIAL: CINNAMON ROLL + FILTER COFFEE FOR &#8377;200 — LIMITED TO 20 ORDERS</span>
          <span>&#9656; CROISSANTS BAKED FRESH THIS MORNING — ONLY AT BREW & FLOUR</span>
          <span>&#9656; FRIDAY NIGHTS: LIVE ACOUSTIC MUSIC FROM 7 PM</span>
          <span>&#9656; TODAY'S SPECIAL: CINNAMON ROLL + FILTER COFFEE FOR &#8377;200</span>
          <span>&#9656; CROISSANTS BAKED FRESH THIS MORNING — ONLY AT BREW & FLOUR</span>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="quickfacts">
            <h3>Quick Facts about Brew & Flour</h3>
            <p>Brew & Flour is located at 42, Race Course Road, Coimbatore, Tamil Nadu 641018. The café serves specialty coffee and fresh in-house bakery items. Brew & Flour is open Monday to Thursday from 8 AM to 10 PM. On Fridays and Saturdays the café is open until 11 PM. On Sundays the café opens at 9 AM and closes at 9 PM. Walk-in customers are always welcome without a reservation. Free WiFi is available for all customers. The café is wheelchair accessible. All menu items are available for takeaway.</p>
          </div>

          <div className="trust-row">
            <div className="item">&#9733; Google: 4.8 Rating (340+ reviews)</div>
            <div className="item">&#9679; Zomato: 4.6 Rated Spot</div>
            <div className="item">&#128337; Open Daily from 8 AM</div>
          </div>
        </div>
      </section>

      <section id="headliners">
        <div className="container">
          <div className="section-head">
            <h2>Our Headliners</h2>
            <p>The daily highlights that put Us on Coimbatore's culinary map.</p>
            <div className="rule"></div>
          </div>
          <div className="grid-3">
            <div className="food-card">
              <div className="thumb">
                <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80" alt="Caramel Latte" />
                <span className="badge house">House Special</span>
              </div>
              <div className="body">
                <h3>Caramel Latte</h3>
                <p>Rich espresso, warm steamed milk, premium salted caramel drizzle. Customer favourite for 3 years.</p>
                <Link to="/menu" className="link">View in Menu &rarr;</Link>
              </div>
            </div>
            <div className="food-card">
              <div className="thumb">
                <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80" alt="Almond Croissant" />
                <span className="badge fresh">Freshly Baked</span>
              </div>
              <div className="body">
                <h3>Almond Croissant</h3>
                <p>Flaky three-day laminated croissant filled with rich almond frangipane. Baked fresh every morning.</p>
                <Link to="/menu" className="link">View in Menu &rarr;</Link>
              </div>
            </div>
            <div className="food-card">
              <div className="thumb">
                <img src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80" alt="18Hr Cold Brew" />
                <span className="badge season">Seasonal Special</span>
              </div>
              <div className="body">
                <h3>18Hr Cold Brew</h3>
                <p>Slow-steeped single origin estate coffee, served chilled on ice. Limited - available this month only.</p>
                <Link to="/menu" className="link">View in Menu &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="foundations-section">
        <div className="container">
          <div className="section-head">
            <h2>Our Foundations</h2>
            <p>What guides us in baking every loaf and pouring every cup.</p>
            <div className="rule"></div>
          </div>
          <div className="grid-3">
            <div className="value-card">
              <div className="icon-circle">&#9749;</div>
              <h3>Quality Coffee</h3>
              <p>Single-origin, hand-selected beans sourced carefully from Karnataka & Tamil Nadu estates, ground and pulled with precision.</p>
            </div>
            <div className="value-card">
              <div className="icon-circle">&#127838;</div>
              <h3>Fresh Baked Daily</h3>
              <p>Laminated puff pastry, rich celebration sponges, and sourdough sheets crafted by in-house bakers. Never frozen, never stale.</p>
            </div>
            <div className="value-card">
              <div className="icon-circle">&#128101;</div>
              <h3>Cozy Community</h3>
              <p>A laptop-friendly layout with reliable high-speed WiFi, silent workspace corners, and sunlit reading benches on Race Course Road.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <h2>Voices of Our Regulars</h2>
            <p>What the local Coimbatore community says about their experiences with Us.</p>
            <div className="rule"></div>
          </div>
          <div className="grid-3">
            <div className="testimonial-card">
              <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="quote">"The best croissant I have had outside of Paris."</p>
              <div className="who"><b>Priya</b><span>Coimbatore</span></div>
            </div>
            <div className="testimonial-card">
              <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="quote">"I work here every Tuesday. Best WiFi and best flat white in the city."</p>
              <div className="who"><b>Karthik</b><span>Coimbatore</span></div>
            </div>
            <div className="testimonial-card">
              <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="quote">"Came for coffee, stayed for the cake. And then came back the next day."</p>
              <div className="who"><b>Divya</b><span>Chennai</span></div>
            </div>
          </div>
          <div className="see-reviews"><a href="#">See all reviews on Google Maps</a></div>
        </div>
      </section>

      <section className="insta-section">
        <div className="container">
          <h2>&#128247; Life at Brew & Flour</h2>
          <p>Follow @brewandflour on Instagram for daily updates, batch alerts and secret menus.</p>
          <div className="rule" style={{ margin: '22px auto 0' }}></div>
          <div className="insta-grid">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80" alt="Espresso pour" />
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80" alt="Fresh bread" />
            <img src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&q=80" alt="Café interior" />
            <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&q=80" alt="Friends at café" />
          </div>
          <a href="#" className="btn btn-dark">Follow Our Instagram</a>
        </div>
      </section>

      <section id="find-us">
        <div className="container">
          <div className="section-head">
            <h2>Find Your Corner</h2>
            <p>Located in the serene heart of Race Course Road, Coimbatore.</p>
            <div className="rule"></div>
          </div>
          <div className="map-wrap">
            <iframe
              title="Brew & Flour location"
              src="https://www.google.com/maps?q=Race+Course+Road,+Coimbatore,+Tamil+Nadu+641018&output=embed"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
          <div className="location-detail">
            <div>
              <div className="block">
                <span className="icon">&#128205;</span>
                <div><h4>Our Home</h4><p>42, Race Course Road, Opposite VOC Park, Coimbatore — 641018</p></div>
              </div>
              <div className="block">
                <span className="icon">&#128337;</span>
                <div>
                  <h4>Opening Hours</h4>
                  <p>Mon–Thu: 8:00 AM – 10:00 PM<br />Fri–Sat: 8:00 AM – 11:00 PM<br />Sunday: 9:00 AM – 9:00 PM</p>
                </div>
              </div>
              <div className="hero-ctas">
                <a href="https://www.google.com/maps?q=Race+Course+Road,+Coimbatore" target="_blank" rel="noreferrer" className="btn btn-dark">Get Directions</a>
                <Link to="/reserve" className="btn btn-outline">Request Table</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
