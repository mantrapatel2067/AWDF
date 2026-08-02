import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";

function Header({ name, title }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="site-header">
      <div className="profile-card">
        <div className="avatar-circle" aria-label="Profile initials">
          {initials}
        </div>
        <h1>{name}</h1>
        <div className="title-line" aria-hidden="true" />
        <p className="tagline">{title}</p>
      </div>
    </header>
  );
}

function HomePage() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <section className="info-panel page-panel">
      <div className="panel-header">
        <span className="panel-mark" aria-hidden="true" />
        <h2>About Me</h2>
      </div>
      <p>
        I am a beginner, learning React and frontend development. I enjoy
        building clean, user-friendly web interfaces and improving my design and
        coding skills every day.
      </p>
      <button
        type="button"
        className="toggle-btn"
        onClick={() => setShowIntro((value) => !value)}
      >
        {showIntro ? "Hide intro" : "Show intro"}
      </button>

      {showIntro && (
        <div className="info-box">
          I like making interfaces that feel simple, practical, and attractive.
        </div>
      )}
    </section>
  );
}

function ProjectsPage() {
  const projects = [
    "Portfolio Website",
    "Task Planner App",
    "Weather Dashboard",
  ];

  return (
    <section className="info-panel page-panel">
      <div className="panel-header">
        <span className="panel-mark" aria-hidden="true" />
        <h2>My Projects</h2>
      </div>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project}>{project}</li>
        ))}
      </ul>
    </section>
  );
}

function ContactPage() {
  const [name, setName] = useState("");

  return (
    <section className="info-panel page-panel">
      <div className="panel-header">
        <span className="panel-mark" aria-hidden="true" />
        <h2>Contact</h2>
      </div>

      <label htmlFor="name-input" className="label">
        Your name
      </label>
      <input
        id="name-input"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Type your name"
        className="contact-input"
      />

      <p className="live-preview">
        {name ? `Hello, ${name}!` : "Hello, friend!"}
      </p>
    </section>
  );
}

function Footer({ email, year }) {
  return (
    <footer className="site-footer">
      <div className="contact-line">
        <span>Get in Touch:</span>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
      <p>© {year} Student Portfolio.</p>
    </footer>
  );
}

function App() {
  const student = {
    name: "Mantra Patel",
    title: "STUDENT PORTFOLIO",
    email: "24cs068@charusat.edu.in",
    year: "2026",
  };

  return (
    <div className="portfolio-page">
      <Header name={student.name} title={student.title} />

      <nav className="route-nav" aria-label="Main navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Contact
        </NavLink>
      </nav>

      <main className="content-grid">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer email={student.email} year={student.year} />
    </div>
  );
}

export default App;
