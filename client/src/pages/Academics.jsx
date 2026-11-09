import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const curriculum = ["Primary Section", "Secondary Section", "Higher Secondary Section"];
const facilities = [
  "Library with 5,000+ books",
  "Modern Science & Computer Labs",
  "Interactive Smart Classrooms",
  "Sports Ground & Indoor Games",
  "Music, Art & Cultural Activities",
];
const quickLinks = [
  { label: "Admissions", topic: "Admissions" },
  { label: "Syllabus & routine", topic: "Academics" },
  { label: "Student results", topic: "Academics" },
  { label: "Meet our teachers", topic: "Other enquiry" },
];

export default function Academics() {
  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryError, setGalleryError] = useState("");

  useEffect(() => {
    api.get("/gallery")
      .then((res) => setGallery(res.data.slice(0, 3)))
      .catch(() => setGalleryError("The gallery preview is temporarily unavailable."))
      .finally(() => setGalleryLoading(false));
  }, []);

  return (
    <div className="academics-page">
      <header className="page-heading">
        <p className="eyebrow">Learning at ABC Academy</p>
        <h1>Academics &amp; facilities</h1>
        <p>A strong foundation, enriching experiences, and support for every learner.</p>
      </header>

      <div className="academics-grid">
        <div>
          <h3>Our Curriculum</h3>
          <ul>
            {curriculum.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Our Facilities</h3>
          <ul>
            {facilities.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2>Quick Links</h2>
      <div className="quick-links">
        {quickLinks.map((q) => (
          <Link className="quick-link" key={q.label} to={`/contact?topic=${encodeURIComponent(q.topic)}`}>
            <span>{q.label}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>

      <h2>Our Gallery</h2>
      <p className="gallery-sub">A Glimpse into Life at ABC Academy</p>
      {galleryLoading && <p>Loading photos…</p>}
      {galleryError && <p className="form-error" role="status">{galleryError}</p>}
      <div className="gallery-preview">
        {gallery.map((g) => (
          <img key={g._id} src={g.imageUrl} alt={g.caption || "Gallery"} />
        ))}
        {!galleryLoading && !galleryError && gallery.length === 0 && <p>Photos from school life will appear here.</p>}
      </div>
      <Link to="/gallery" className="text-link">Explore the full gallery <span aria-hidden="true">→</span></Link>
    </div>
  );
}
