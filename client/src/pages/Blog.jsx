import Newsletter from '../components/Newsletter.jsx'

const posts = [
  {
    date: 'March 12, 2026',
    title: 'How We Choose Our Single-Origin Beans',
    desc: 'A look inside our sourcing trips to the Nilgiris and what we look for in a cup.',
    img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&q=80',
  },
  {
    date: 'February 24, 2026',
    title: "The Three-Day Croissant: Why We Don't Rush Lamination",
    desc: 'Inside the slow-fold process our bakers use for that signature flake.',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80',
  },
  {
    date: 'January 30, 2026',
    title: 'Behind the Friday Night Live Sessions',
    desc: 'How our acoustic evenings became a Race Course Road tradition.',
    img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&q=80',
  },
]

export default function Blog() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Blog</h1>
          <div className="rule"></div>
          <p>Notes on beans, baking, and life at Race Course Road.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="blog-grid">
            {posts.map((post) => (
              <div className="blog-card" key={post.title}>
                <img src={post.img} alt={post.title} />
                <div className="body">
                  <span className="date">{post.date}</span>
                  <h3>{post.title}</h3>
                  <p>{post.desc}</p>
                  <a href="#" className="link">Read More &rarr;</a>
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
