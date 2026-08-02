function About({ heading, description }) {
  return (
    <section className="info-panel">
      <div className="panel-header">
        <span className="panel-mark" aria-hidden="true" />
        <h2>{heading}</h2>
      </div>
      <p>{description}</p>
    </section>
  );
}

export default About;
