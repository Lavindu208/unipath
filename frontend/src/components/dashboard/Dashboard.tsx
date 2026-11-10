import type { User } from "../../types/auth.types";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  return (
    <div className="app">
      <header className="header">
        <div className="header-brand">
          <h1>UniPath 🎓</h1>
          <span className="badge">Student Portal</span>
        </div>
        <nav>
          <div className="user-profile">
            <span className="user-avatar">👤</span>
            <div className="user-meta">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="main">
        {/* Welcome Section */}
        <section className="dashboard-welcome">
          <h2>Welcome back, {user.name}! 👋</h2>
          <p className="muted">
            Here is your personalized UniPath dashboard overview.
          </p>

          <div className="user-stats-grid">
            <div className="stat-card">
              <span className="stat-label">Z-Score</span>
              <span className="stat-val">{user.zScore ?? "Not set"}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">A/L Stream</span>
              <span className="stat-val">{user.stream || "Not specified"}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">District</span>
              <span className="stat-val">{user.district || "Not specified"}</span>
            </div>
          </div>
        </section>

        {/* Empty Dashboard Content Area */}
        <section className="dashboard-empty-panel">
          <div className="empty-state">
            <span className="empty-icon">📊</span>
            <h3>Your Dashboard is Ready</h3>
            <p className="muted">
              Explore university registration details, degrees, cut-offs, and career paths.
              Additional dashboard widgets and recommendations will appear here.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        UniPath Student Portal • Official information should always be confirmed with UGC and the universities.
      </footer>
    </div>
  );
}

export default Dashboard;
