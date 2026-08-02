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

export default Header;
