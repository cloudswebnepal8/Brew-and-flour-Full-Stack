import { useEffect, useState } from 'react'
import localGalleryItems, { galleryFilters } from '../data/galleryItems.js'
import { getGallery } from '../api.js'
import Newsletter from '../components/Newsletter.jsx'

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState(localGalleryItems)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let cancelled = false
    getGallery()
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length) setGalleryItems(data)
      })
      .catch(() => {
        // silently keep local fallback data
      })
    return () => { cancelled = true }
  }, [])

  const items = filter === 'all' ? galleryItems : galleryItems.filter((i) => i.category === filter)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Visual Gallery</h1>
          <div className="rule"></div>
          <p>A graphical journey around our hand-laminated pastry layers, roasted beans and sunny brick walls.</p>
        </div>
      </section>

      <div className="menu-tools" style={{ textAlign: 'center' }}>
        <div className="container chip-row" style={{ justifyContent: 'center' }}>
          {galleryFilters.map((f) => (
            <button
              key={f.key}
              className={`chip${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <section>
        <div className="container">
          <div className="gallery-grid">
            {items.map((item) => (
              <div className="gallery-item" key={item.id}>
                <img src={item.img} alt={item.title} />
                <div className="cap">
                  <span>{item.category}</span>
                  <b>{item.title}</b>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
