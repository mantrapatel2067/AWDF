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

export default Footer;
