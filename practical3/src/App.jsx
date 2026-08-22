import { useEffect, useState } from "react";
import "./App.css";

const username = "mantrapatel2067";
const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`;

function LoadingSpinner() {
  return (
    <div className="loading" role="status">
      <span className="spinner" />
      <span>Loading repositories...</span>
    </div>
  );
}

function ErrorMessage({ tryAgain }) {
  return (
    <div className="error-message" role="alert">
      <p>Unable to load repositories.</p>
      <button type="button" onClick={tryAgain}>
        Try again
      </button>
    </div>
  );
}

function ProjectsPage() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function getRepositories() {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(apiUrl, {
          headers: { Accept: "application/vnd.github+json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();
        setRepositories(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getRepositories();
    return () => controller.abort();
  }, [attempt]);

  return (
    <main className="repository-page">
      <h1>My GitHub Repositories</h1>
      <h2>Click on the repository name to visit the repository</h2>
      <h3>24CS068 Mantra Patel</h3>

      {loading && <LoadingSpinner />}
      {error && (
        <ErrorMessage tryAgain={() => setAttempt((value) => value + 1)} />
      )}
      {!loading && !error && repositories.length === 0 && (
        <p className="empty-message">No public repositories found.</p>
      )}
      {!loading && !error && repositories.length > 0 && (
        <section className="repository-list" aria-label="GitHub repositories">
          {repositories.map((repository) => (
            <article className="repository-card" key={repository.id}>
              <a href={repository.html_url} target="_blank" rel="noreferrer">
                {repository.name}
              </a>
              <p>{repository.html_url}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

function App() {
  return <ProjectsPage />;
}

export default App;
