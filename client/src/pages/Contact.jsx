import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialError, setTestimonialError] = useState("");
  const [active, setActive] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: searchParams.get("topic") || "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    api.get("/testimonials")
      .then((res) => setTestimonials(res.data))
      .catch(() => setTestimonialError("Testimonials are temporarily unavailable."));
  }, []);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setFeedback(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    setFeedback(null);
    try {
      const { data } = await api.post("/contact", form);
      setFeedback({ type: "success", text: data.message });
      setForm({ name: "", email: "", topic: "", message: "" });
    } catch (error) {
      setFeedback({
        type: "error",
        text: error.response?.data?.message || "We couldn't send your message. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-page">
      <header className="page-heading">
        <p className="eyebrow">We’re here to help</p>
        <h1>Let’s start a conversation.</h1>
        <p>Ask us about admissions, school life, or anything else you’d like to know.</p>
      </header>

      <div className="contact-layout">
        <section className="contact-details" aria-label="School contact details">
          <div className="contact-detail">
            <span className="detail-label">Visit</span>
            <strong>ABC Street, Murshidabad, West Bengal 742304</strong>
          </div>
          <div className="contact-detail">
            <span className="detail-label">Email</span>
            <a href="mailto:info@abcacademy.com">info@abcacademy.com</a>
          </div>
          <p>Our school team will review your message and get back to you.</p>
          {testimonials.length > 0 && (
            <figure className="testimonial-card">
              <span className="quote-mark" aria-hidden="true">&ldquo;</span>
              <blockquote>{testimonials[active]?.quote}</blockquote>
              <figcaption className="testimonial-author">
                {testimonials[active]?.author}
              </figcaption>
              <div className="dots" aria-label="Choose a testimonial">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial._id || index}
                    type="button"
                    className={index === active ? "dot active" : "dot"}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-pressed={index === active}
                    onClick={() => setActive(index)}
                  />
                ))}
              </div>
            </figure>
          )}
          {testimonialError && <p className="form-error" role="status">{testimonialError}</p>}
        </section>

        <section className="contact-form-card">
          <h2>Send us a message</h2>
          <p>Fields marked with * are required.</p>
          <form className="contact-form" onSubmit={submit}>
            <label>
              Your name *
              <input
                name="name"
                type="text"
                autoComplete="name"
                maxLength={100}
                value={form.name}
                onChange={updateField}
                required
              />
            </label>
            <label>
              Email address *
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                value={form.email}
                onChange={updateField}
                required
              />
            </label>
            <label>
              What can we help with? *
              <select name="topic" value={form.topic} onChange={updateField} required>
                <option value="">Select a topic</option>
                <option>Admissions</option>
                <option>Academics</option>
                <option>School life</option>
                <option>Other enquiry</option>
              </select>
            </label>
            <label>
              Your message *
              <textarea
                name="message"
                rows={5}
                maxLength={5000}
                value={form.message}
                onChange={updateField}
                required
              />
            </label>
            {feedback && (
              <p className={feedback.type === "error" ? "form-error" : "form-success"} role="status">
                {feedback.text}
              </p>
            )}
            <button type="submit" disabled={sending}>
              {sending ? "Sending message…" : "Send message"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
