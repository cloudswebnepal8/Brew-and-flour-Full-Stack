import { Link } from 'react-router-dom'

export default function Order() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Order Online</h1>
          <div className="rule"></div>
          <p>Get your Brew & Flour favourites delivered, or skip the line with pickup.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="order-hero-card">
            <h2>Choose How You'd Like to Order</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '14px' }}>
              We partner with the platforms below for delivery, or you can call ahead for pickup at the counter.
            </p>
          </div>

          <div className="order-options">
            <div className="order-option">
              <div className="icon-circle">&#128666;</div>
              <h4>Delivery</h4>
              <p>Order through Swiggy or Zomato for delivery within 5km of Race Course Road.</p>
              <a href="#" className="btn btn-outline">Order on Swiggy</a>
            </div>
            <div className="order-option">
              <div className="icon-circle">&#128717;</div>
              <h4>Pickup</h4>
              <p>Call ahead and skip the line — your order will be ready at the counter.</p>
              <a href="tel:+919876543210" className="btn btn-outline">Call to Order</a>
            </div>
            <div className="order-option">
              <div className="icon-circle">&#127974;</div>
              <h4>Catering</h4>
              <p>Planning an event? Ask about our bakery boxes and coffee catering packages.</p>
              <Link to="/contact" className="btn btn-outline">Enquire Now</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
