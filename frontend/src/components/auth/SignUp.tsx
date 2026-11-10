import { useState } from "react";
import type { FormEvent } from "react";
import authService from "../../services/authService";
import type { SignUpData } from "../../types/auth.types";

interface SignUpProps {
  onNavigateToLogin: (message?: string) => void;
}

const DISTRICTS = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Ratnapura", "Kegalle",
];

const STREAMS = [
  "Physical Science (Maths)",
  "Biological Science",
  "Commerce",
  "Arts",
  "Technology",
  "Other",
];

export function SignUp({ onNavigateToLogin }: SignUpProps) {
  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    zScore: undefined,
    district: "",
    stream: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "zScore" ? (value === "" ? undefined : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError("Please fill in all required fields (Name, Email, Password).");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (
      formData.zScore !== undefined &&
      formData.zScore !== null &&
      (isNaN(formData.zScore) || formData.zScore < -4 || formData.zScore > 4)
    ) {
      setError("Please enter a valid Z-Score (between -4.0000 and 4.0000).");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.signup(formData);
      if (response.success) {
        onNavigateToLogin("Registration successful! Please log in with your credentials.");
      } else {
        setError(response.message || "Failed to sign up.");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "An unexpected error occurred.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-hero">
        <h1>UniPath 🎓</h1>
        <p>Create your account to explore universities and programs tailored to your A/L results.</p>
        <ul>
          <li>🏛️ Tailored university and degree suggestions</li>
          <li>🎯 Recommendations based on your Z-Score and stream</li>
          <li>📊 Up-to-date admission procedures and cutoffs</li>
          <li>💼 Career outlooks and industry demands</li>
        </ul>
      </div>

      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="muted">Enter your details to get started with UniPath</p>

        <label className="form-label" htmlFor="name">Full Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="e.g. Kasun Perera"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="form-label" htmlFor="email">Email Address *</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="e.g. kasun@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="form-label" htmlFor="password">Password (min 6 characters) *</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter a secure password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className="form-label" htmlFor="zScore">Z-Score (Optional)</label>
        <input
          id="zScore"
          name="zScore"
          type="number"
          step="0.0001"
          placeholder="e.g. 1.8542"
          value={formData.zScore ?? ""}
          onChange={handleChange}
        />

        <div className="form-grid">
          <div>
            <label className="form-label" htmlFor="district">District</label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
            >
              <option value="">Select District</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label" htmlFor="stream">A/L Stream</label>
            <select
              id="stream"
              name="stream"
              value={formData.stream}
              onChange={handleChange}
            >
              <option value="">Select Stream</option>
              {STREAMS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="primary" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="switch">
          Already have an account?{" "}
          <span onClick={() => onNavigateToLogin()}>Login here</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
