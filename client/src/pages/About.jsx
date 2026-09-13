import Newsletter from '../components/Newsletter.jsx'

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Story</h1>
          <div className="rule"></div>
          <p>Built on patience, folding butter, and searching for the perfect pour in Coimbatore.</p>
        </div>
      </section>

      <section>
        <div className="container story-grid">
          <div>
            <h2>Where the Perfect Bite Meets the Perfect Cup</h2>
            <p>Brew & Flour started with a simple idea: coffee should be enjoyed with something freshly baked. Not a packaged biscuit. Not a stale muffin. Something warm, flaky, and made that morning.</p>
            <p>Our founder discovered specialty coffee while traveling through Coimbatore's hidden coffee estates. She learned about bean sourcing, roasting profiles, and the perfect pour. But something was missing — the perfect bite beside the perfect cup.</p>
            <p>So she brought in a classically trained baker, fitted out a sunlit corner on Race Course Road, and Brew & Flour was born: a place where the espresso machine and the proofing cabinet share equal billing.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=700&q=80" alt="Café interior" />
        </div>
      </section>

      <section className="stats-strip">
        <div className="container grid-3">
          <div><h3>Since 2019</h3><span>YEARS OF COMMUNITY SERVICE</span></div>
          <div><h3>120+ Items</h3><span>BAKED FRESH EVERY MORNING</span></div>
          <div><h3>4.8 Stars</h3><span>GOOGLE MAPS VERIFIED RATING</span></div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <h2>Our Core Philosophies</h2>
            <p>The driving elements behind every cup of espresso we pull and dough we fold.</p>
            <div className="rule"></div>
          </div>
          <div className="grid-3">
            <div className="value-card">
              <div className="icon-circle">&#9749;</div>
              <h3>Quality Coffee</h3>
              <p>We source beans directly from nearby estates in the Nilgiris, monitoring roast curves closely, pulling each shot under precise, professional conditions.</p>
            </div>
            <div className="value-card">
              <div className="icon-circle">&#127838;</div>
              <h3>Fresh Baked Daily</h3>
              <p>We work on slow, heritage fermentation routines without artificial yeast triggers or packaged fats, creating flaky pastries in our open-view bakery space.</p>
            </div>
            <div className="value-card">
              <div className="icon-circle">&#128101;</div>
              <h3>Cozy Community</h3>
              <p>We serve as the local Coimbatore salon where artists draft their next scripts, students review notes, and neighbors enjoy calm morning conversations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-strip">
        <div className="container">
          <p>"We don't just serve coffee. We give people a reason to slow down."</p>
          <div className="rule" style={{ margin: '0 auto' }}></div>
        </div>
      </section>

      <section className="space-tour">
        <div className="container">
          <div className="section-head">
            <h2>The Space At Race Course</h2>
            <p>A tour around our sunny wooden furniture, green foliage corners, and barista benches.</p>
            <div className="rule"></div>
          </div>
          <div className="tour-grid">
            <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&q=80" alt="Café sign" />
            <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=80" alt="Coffee cups from above" />
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=80" alt="Café seating area" />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
