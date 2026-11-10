import { useState } from "react";
import "./App.css";
import Login from "./Login";
import { universities, rankings } from "./data";
import type { University, Degree } from "./data";

type Page = "home" | "ranking";
type Tab = "about" | "registration" | "degrees";
type DegTab = "overview" | "modules" | "jobs";

const demandPercent = { High: 90, Medium: 60, Low: 30 };

const logoBox = (size: number) => ({
  width: size,
  height: size,
  background: "#fff",
  borderRadius: 16,
  padding: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,.25)",
  flexShrink: 0,
});

function Logo({ uni, size }: { uni: University; size: number }) {
  return (
    <div style={logoBox(size)}>
      <img
        src={uni.logo}
        alt={uni.name + " logo"}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}

function Banner({ uni }: { uni: University }) {
  const style = uni.image
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.35)),url(${uni.image})` }
    : { background: uni.color };
  return (
    <div className="banner" style={style}>
      {uni.logo ? <Logo uni={uni} size={90} /> : <span className="banner-emoji">{uni.emoji}</span>}
      <div>
        <h2>{uni.name}</h2>
        <p>📍 {uni.location}</p>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<string | null>(localStorage.getItem("unipath_current"));
  const [page, setPage] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<University | null>(null);
  const [tab, setTab] = useState<Tab>("about");
  const [degree, setDegree] = useState<Degree | null>(null);
  const [degTab, setDegTab] = useState<DegTab>("overview");

  const login = (name: string) => {
    localStorage.setItem("unipath_current", name);
    setUser(name);
  };
  const logout = () => {
    localStorage.removeItem("unipath_current");
    setUser(null);
    setSelected(null);
    setDegree(null);
  };

  if (!user) return <Login onLogin={login} />;

  const filtered = universities.filter((u) =>
    (u.name + u.location).toLowerCase().includes(search.toLowerCase())
  );

  const goHome = () => {
    setSelected(null);
    setDegree(null);
    setPage("home");
  };

  const openUni = (u: University) => {
    setSelected(u);
    setTab("about");
    setDegree(null);
  };

  const openDegree = (d: Degree) => {
    setDegree(d);
    setDegTab("overview");
  };

  return (
    <div className="app">
      <header className="header">
        <h1 onClick={goHome}>UniPath 🎓</h1>
        <nav>
          <button onClick={goHome}>Universities</button>
          <button onClick={() => setPage("ranking")}>Rankings</button>
          <span className="user">👤 {user}</span>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>

      <main className="main">
        {page === "ranking" && (
          <section>
            <h2>🏆 University Rankings</h2>
            <p className="muted">Source: {rankings.source} | Year: {rankings.year}</p>
            <table>
              <thead>
                <tr><th>Rank</th><th>University</th></tr>
              </thead>
              <tbody>
                {rankings.list.map((r) => (
                  <tr key={r.rank}>
                    <td><span className="rank">{r.rank}</span></td>
                    <td>{r.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {page === "home" && !selected && (
          <section>
            <div className="hero">
              <h2>Hi {user}, choose your university 👋</h2>
              <p>Explore registration steps, degree programs and job opportunities.</p>
            </div>
            <input
              className="search"
              placeholder="🔍 Search university or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid">
              {filtered.map((u) => (
                <div key={u.id} className="card" onClick={() => openUni(u)}>
                  <div
                    className="card-img"
                    style={
                      u.logo
                        ? { background: u.color }
                        : u.image
                        ? { backgroundImage: `url(${u.image})` }
                        : { background: u.color }
                    }
                  >
                    {u.logo ? (
                      <Logo uni={u} size={110} />
                    ) : (
                      !u.image && <span>{u.emoji}</span>
                    )}
                  </div>
                  <div className="card-body">
                    <h3>{u.name}</h3>
                    <p className="muted">📍 {u.location}</p>
                    <p>{u.about}</p>
                    <span className="badge">{u.degrees.length} degree programs</span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <p>No universities found.</p>}
            </div>
          </section>
        )}

        {page === "home" && selected && (
          <section>
            <button className="back" onClick={() => { setSelected(null); setDegree(null); }}>
              ← All universities
            </button>
            <Banner uni={selected} />

            <div className="tabs">
              {(["about", "registration", "degrees"] as Tab[]).map((t) => (
                <button
                  key={t}
                  className={tab === t ? "tab active" : "tab"}
                  onClick={() => { setTab(t); setDegree(null); }}
                >
                  {t === "about" ? "ℹ️ About" : t === "registration" ? "📝 Registration" : "📚 Degree Programs"}
                </button>
              ))}
            </div>

            {tab === "about" && (
              <div className="panel">
                <p>{selected.about}</p>
                <a href={selected.website} target="_blank" rel="noreferrer">Official website ↗</a>
              </div>
            )}

            {tab === "registration" && (
              <div className="panel">
                <h3>Registration process</h3>
                <ol>{selected.registration.process.map((s) => <li key={s}>{s}</li>)}</ol>
                <h3>Documents required</h3>
                <ul>{selected.registration.documents.map((d) => <li key={d}>{d}</li>)}</ul>
                <h3>Fees</h3>
                <p>{selected.registration.fees}</p>
                <h3>Dates</h3>
                <p>{selected.registration.dates}</p>
                <a href={selected.registration.officialLink} target="_blank" rel="noreferrer">
                  Official registration info ↗
                </a>
              </div>
            )}

            {tab === "degrees" && !degree && (
              <div className="grid">
                {selected.degrees.map((d) => (
                  <div key={d.name} className="card" onClick={() => openDegree(d)}>
                    <div className="card-img small" style={{ background: selected.color }}>
                      <span>{d.icon}</span>
                    </div>
                    <div className="card-body">
                      <h3>{d.name}</h3>
                      <p className="muted">{d.faculty}</p>
                      <p>{d.description}</p>
                      <span className="badge">{d.duration}</span>
                      <span className="badge">{d.medium}</span>
                      <span className={"demand " + d.jobMarket.demand}>{d.jobMarket.demand} demand</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "degrees" && degree && (
              <div className="panel">
                <button className="back" onClick={() => setDegree(null)}>← All degrees</button>
                <div className="deg-head" style={{ background: selected.color }}>
                  <span className="banner-emoji">{degree.icon}</span>
                  <div>
                    <h3>{degree.name}</h3>
                    <p>{degree.faculty} • {degree.duration} • {degree.medium}</p>
                  </div>
                </div>

                <div className="tabs">
                  {(["overview", "modules", "jobs"] as DegTab[]).map((t) => (
                    <button
                      key={t}
                      className={degTab === t ? "tab active" : "tab"}
                      onClick={() => setDegTab(t)}
                    >
                      {t === "overview" ? "Overview" : t === "modules" ? "Course Content" : "💼 Job Market"}
                    </button>
                  ))}
                </div>

                {degTab === "overview" && (
                  <div>
                    <p>{degree.description}</p>
                    <h4>Skills you will build</h4>
                    {degree.skills.map((s) => <span key={s} className="badge">{s}</span>)}
                  </div>
                )}

                {degTab === "modules" && (
                  <div className="years">
                    {degree.modules.map((m) => (
                      <div key={m.year} className="year">
                        <strong>{m.year}</strong>
                        <ul>{m.subjects.map((s) => <li key={s}>{s}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                )}

                {degTab === "jobs" && (
                  <div>
                    <h4>Demand in the job market</h4>
                    <div className="meter">
                      <div
                        className={"meter-fill " + degree.jobMarket.demand}
                        style={{ width: demandPercent[degree.jobMarket.demand] + "%" }}
                      />
                    </div>
                    <p><span className={"demand " + degree.jobMarket.demand}>{degree.jobMarket.demand}</span> {degree.jobMarket.notes}</p>

                    <h4>Career paths</h4>
                    {degree.careers.map((c) => <span key={c} className="badge">{c}</span>)}

                    <h4>Where you can work</h4>
                    {degree.sectors.map((s) => <span key={s} className="badge green">{s}</span>)}

                    <h4>Future outlook</h4>
                    <p>{degree.jobMarket.outlook}</p>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        Information may change yearly. Always confirm with UGC and the university.
      </footer>
    </div>
  );
}

export default App;