import { useState } from "react";
import type { FormEvent } from "react";

type Props = { onLogin: (name: string) => void };

type StoredUser = { name: string; email: string; password: string };

// DEMO ONLY: users are stored in the browser (localStorage).
// A real app must authenticate through the backend (hashed passwords + JWT).
const getUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem("unipath_users") || "[]");
  } catch {
    return [];
  }
};

function Login({ onLogin }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const users = getUsers();

    if (mode === "register") {
      if (!name || !email || password.length < 6) {
        setError("Fill all fields (password at least 6 characters).");
        return;
      }
      if (users.some((u) => u.email === email)) {
        setError("This email is already registered.");
        return;
      }
      localStorage.setItem("unipath_users", JSON.stringify([...users, { name, email, password }]));
      onLogin(name);
    } else {
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        setError("Wrong email or password.");
        return;
      }
      onLogin(user.name);
    }
  };

  return (
    <div className="login-page">
      <div className="login-hero">
        <h1>UniPath 🎓</h1>
        <p>Find your university, degree and future career in Sri Lanka.</p>
        <ul>
          <li>🏛️ Explore state universities</li>
          <li>📝 Registration details after A/L</li>
          <li>📚 Degree programs and course content</li>
          <li>💼 Job market for every degree</li>
        </ul>
      </div>

      <form className="login-card" onSubmit={submit}>
        <h2>{mode === "login" ? "Welcome back" : "Create account"}</h2>

        {mode === "register" && (
          <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="primary">
          {mode === "login" ? "Login" : "Register"}
        </button>

        <p className="switch">
          {mode === "login" ? "No account? " : "Already have an account? "}
          <span onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
            {mode === "login" ? "Register" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;