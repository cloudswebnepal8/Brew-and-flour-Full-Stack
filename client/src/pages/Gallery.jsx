import { useEffect, useState } from "react";
import api from "../api";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/gallery")
      .then((res) => setImages(res.data))
      .catch(() => setError("The gallery is temporarily unavailable. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="gallery-page">
      <header className="page-heading">
        <p className="eyebrow">Life at ABC Academy</p>
        <h1>Our gallery</h1>
        <p>A glimpse into learning, friendship, and school celebrations.</p>
      </header>
      {loading && <p>Loading photos…</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="gallery-grid">
        {images.map((g) => (
          <figure key={g._id} className="gallery-item">
            <img src={g.imageUrl} alt={g.caption || "School life at ABC Academy"} loading="lazy" />
            {g.caption && <figcaption>{g.caption}</figcaption>}
          </figure>
        ))}
        {!loading && !error && images.length === 0 && <p>Photos from school life will appear here.</p>}
      </div>
    </div>
  );
}
