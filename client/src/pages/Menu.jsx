import { useEffect, useMemo, useState } from 'react'
import localMenuItems, { categories } from '../data/menuItems.js'
import { getMenu } from '../api.js'
import Newsletter from '../components/Newsletter.jsx'

const dietTags = {
  veg: { label: 'Veg', className: 'veg' },
  vegan: { label: 'Vegan', className: 'veg' },
  gf: { label: 'Gluten Free', className: 'gf' },
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState(localMenuItems)
  const [loadError, setLoadError] = useState(false)

  const [query, setQuery] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [category, setCategory] = useState('all')
  const [dietFilter, setDietFilter] = useState('all')
  const [likedOnly, setLikedOnly] = useState(false)
  const [liked, setLiked] = useState(new Set())

  // Load the menu from the backend on mount. Falls back to the bundled
  // local data (and shows a small notice) if the API isn't reachable.
  useEffect(() => {
    let cancelled = false
    getMenu()
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length) setMenuItems(data)
      })
      .catch(() => {
        if (!cancelled) setLoadError(true)
      })
    return () => { cancelled = true }
  }, [])

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const categoryCounts = useMemo(() => {
    const counts = { all: menuItems.length }
    categories.forEach((c) => {
      if (c.key !== 'all') counts[c.key] = menuItems.filter((m) => m.category === c.key).length
    })
    return counts
  }, [menuItems])

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category
      const matchesDiet = dietFilter === 'all' || item.diet.includes(dietFilter)
      const matchesLiked = !likedOnly || liked.has(item.id)
      const matchesQuery = !query || item.name.toLowerCase().includes(query.toLowerCase())
      let matchesPrice = true
      if (priceRange === 'low') matchesPrice = item.price < 150
      else if (priceRange === 'mid') matchesPrice = item.price >= 150 && item.price <= 300
      else if (priceRange === 'high') matchesPrice = item.price > 300
      return matchesCategory && matchesDiet && matchesLiked && matchesQuery && matchesPrice
    })
  }, [menuItems, category, dietFilter, likedOnly, liked, query, priceRange])

  const clearFilters = () => {
    setQuery('')
    setPriceRange('all')
    setCategory('all')
    setDietFilter('all')
    setLikedOnly(false)
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Menu — Made Fresh Daily</h1>
          <div className="rule"></div>
          <p>Gourmet single-origin coffees, handmade laminated pastries, warm meals, and comforting breakfast bowls baked and served in the heart of Coimbatore.</p>
        </div>
      </section>

      <div className="menu-tools">
        <div className="container">
          {loadError && (
            <p style={{ color: '#b5493f', fontSize: '0.85rem', marginBottom: '12px' }}>
              Couldn't reach the menu API — showing saved menu data instead. (Is the backend running on port 3001?)
            </p>
          )}
          <div className="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search menu items..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="filter-row">
            <select className="price-select" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="all">Prices: All Ranges</option>
              <option value="low">Under &#8377;150</option>
              <option value="mid">&#8377;150 – &#8377;300</option>
              <option value="high">Above &#8377;300</option>
            </select>
            <div className="chip-row">
              <button className={`chip${dietFilter === 'all' ? ' active' : ''}`} onClick={() => setDietFilter('all')}>All Items</button>
              <button className={`chip${dietFilter === 'veg' ? ' active' : ''}`} onClick={() => setDietFilter('veg')}>Veg</button>
              <button className={`chip${dietFilter === 'vegan' ? ' active' : ''}`} onClick={() => setDietFilter('vegan')}>Vegan</button>
              <button className={`chip${dietFilter === 'gf' ? ' active' : ''}`} onClick={() => setDietFilter('gf')}>Gluten Free</button>
              <button className={`chip liked${likedOnly ? ' active' : ''}`} onClick={() => setLikedOnly((v) => !v)}>&#9829; Liked Only</button>
            </div>
            <div className="filter-meta">
              <span>Showing {filtered.length} items</span>
              <a href="#" onClick={(e) => { e.preventDefault(); clearFilters() }}>Clear all filters</a>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="special-banner">
            <h3>Today's Special Offering</h3>
            <p>Order the signature Cinnamon Roll paired with local hot Filter Coffee for only &#8377;200 (Save &#8377;20 on individual card listings!). Ask your server today.</p>
          </div>

          <div className="category-tabs">
            {categories.map((c) => (
              <button
                key={c.key}
                className={category === c.key ? 'active' : ''}
                onClick={() => setCategory(c.key)}
              >
                {c.label}{c.key !== 'all' ? ` (${categoryCounts[c.key] ?? 0})` : ''}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filtered.map((item) => (
              <div className="menu-card" key={item.id}>
                <div className="thumb">
                  <img src={item.img} alt={item.name} />
                  <button
                    className={`heart-btn${liked.has(item.id) ? ' liked' : ''}`}
                    onClick={() => toggleLike(item.id)}
                    aria-label="Like this item"
                  >
                    {liked.has(item.id) ? '\u2665' : '\u2661'}
                  </button>
                </div>
                <div className="body">
                  <div className="tag-row">
                    {item.diet.map((d) => (
                      <span key={d} className={`tag ${dietTags[d]?.className || 'veg'}`}>{dietTags[d]?.label || d}</span>
                    ))}
                  </div>
                  <h3>{item.name}</h3>
                  <p className="desc">{item.desc}</p>
                  <div className="price-row">
                    <span className="price">&#8377;{item.price}</span>
                    <button className="reserve-btn">Reserve</button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>
                No items match your filters. Try clearing them above.
              </p>
            )}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
