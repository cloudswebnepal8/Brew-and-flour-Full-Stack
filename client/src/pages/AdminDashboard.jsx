import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setError("");
    try {
      const noticeRequest = api.get("/notices");
      const messageRequest = user?.role === "admin" ? api.get("/contact") : Promise.resolve(null);
      const [noticeResponse, messageResponse] = await Promise.all([noticeRequest, messageRequest]);
      setNotices(noticeResponse.data);
      if (messageResponse) setMessages(messageResponse.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Dashboard data could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadDashboard();
  }, [user]);

  if (!user || (user.role !== "admin" && user.role !== "teacher")) {
    return <Navigate to="/admin-login" replace />;
  }

  const addNotice = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.post("/notices", { title, date });
      setTitle("");
      setDate("");
      await loadDashboard();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "The notice could not be posted.");
    } finally {
      setSaving(false);
    }
  };

  const deleteNotice = async (id) => {
    setError("");
    try {
      await api.delete(`/notices/${id}`);
      await loadDashboard();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "The notice could not be deleted.");
    }
  };

  return (
    <div className="dashboard-page">
      <h2>Dashboard — {user.name} ({user.role})</h2>
      {error && <p className="form-error" role="alert">{error}</p>}

      <section>
        <h3>Post a Notice</h3>
        <form onSubmit={addNotice} className="notice-form">
          <input
            type="text"
            placeholder="Notice title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button type="submit" disabled={saving}>{saving ? "Posting…" : "Post notice"}</button>
        </form>
      </section>

      <section>
        <h3>Existing notices</h3>
        {loading && <p>Loading notices…</p>}
        <ul className="admin-notice-list">
          {notices.map((n) => (
            <li key={n._id}>
              <span>{new Date(n.date).toLocaleDateString()} — {n.title}</span>
              {user.role === "admin" && (
                <button onClick={() => deleteNotice(n._id)}>Delete</button>
              )}
            </li>
          ))}
          {!loading && notices.length === 0 && <li>No notices have been posted yet.</li>}
        </ul>
      </section>

      {user.role === "admin" && (
        <section>
          <h3>Contact inbox <span className="inbox-count">{messages.length}</span></h3>
          <p>Recent enquiries submitted through the school website.</p>
          {loading && <p>Loading enquiries…</p>}
          {!loading && messages.length === 0 && <p>Your inbox is clear.</p>}
          <ul className="admin-message-list">
            {messages.map((message) => (
              <li key={message._id}>
                <div>
                  <strong>{message.topic}</strong>
                  <p>{message.name} · {message.email}</p>
                  <p>{message.message}</p>
                  <time dateTime={message.createdAt}>
                    {new Date(message.createdAt).toLocaleString()}
                  </time>
                </div>
                <a href={`mailto:${encodeURIComponent(message.email)}?subject=${encodeURIComponent(`ABC Academy enquiry: ${message.topic}`)}`}>
                  Reply
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
