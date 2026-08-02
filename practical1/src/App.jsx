import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const student = {
    name: "Mantra Patel",
    title: "STUDENT PORTFOLIO",
    aboutHeading: "About Me",
    aboutText:
      "I am a beginner, learning React and frontend development. I enjoy building clean, user-friendly web interfaces and improving my design and coding skills every day.",
    skillsTitle: "My Skills",
    skills: ["HTML", "CSS", "JavaScript", "React", "C++", "React Native"],
    email: "24cs068@charusat.edu.in",
    year: "2026",
  };

  return (
    <div className="portfolio-page">
      <Header name={student.name} title={student.title} />

      <main className="content-grid">
        <About heading={student.aboutHeading} description={student.aboutText} />
        <Skills title={student.skillsTitle} skills={student.skills} />
      </main>

      <Footer email={student.email} year={student.year} />
    </div>
  );
}

export default App;
