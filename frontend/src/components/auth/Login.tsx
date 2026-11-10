import { useState } from "react";
import type { FormEvent } from "react";
import authService from "../../services/authService";
import type { User } from "../../types/auth.types";

interface LoginProps {
  onSuccessLogin: (user: User) => void;
  onNavigateToSignUp: () => void;
  successNotification?: string;
}

export function Login({
  onSuccessLogin,
  onNavigateToSignUp,
  successNotification,
}: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      if (response.success && response.user) {
        onSuccessLogin(response.user);
      } else {
        setError(response.message || "Login failed.");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Invalid email or password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-hero">
        <h1>UniPath 🎓</h1>
        <p>Your gateway to Sri Lankan state universities, degree paths, and career opportunities.</p>
        <ul>
          <li>🏛️ Explore state universities & campus profiles</li>
          <li>📝 Registration guidelines and documents checklist</li>
          <li>📚 Comprehensive degree curriculum & modules</li>
          <li>💼 Real-time job market outlook and demand trends</li>
        </ul>
      </div>

      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="muted">Log in to your UniPath account</p>

        {successNotification && (
          <div className="success-banner">
            ✓ {successNotification}
          </div>
        )}

        <label className="form-label" htmlFor="login-email">Email Address</label>
        <input
          id="login-email"
          type="email"
          placeholder="e.g. kasun@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="form-label" htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="switch">
          Don't have an account?{" "}
          <span onClick={onNavigateToSignUp}>Sign up here</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
