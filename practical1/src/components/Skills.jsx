function Skills({ title, skills }) {
  return (
    <section className="info-panel">
      <div className="panel-header">
        <span className="panel-mark" aria-hidden="true" />
        <h2>{title}</h2>
      </div>

      <div className="skill-grid">
        {skills.map((skill) => (
          <span key={skill} className="skill-badge">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Skills;
