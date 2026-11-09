import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthContext";

export default function LoginForm({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password, role });
      login(res.data);
      navigate(role === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={submit}>
        <p className="eyebrow">ABC Academy staff portal</p>
        <h2>{role === "admin" ? "Admin Login" : "Teacher Login"}</h2>
        <p>Sign in with the account provided by your school administrator.</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>
    </div>
  );
}
