import { Link } from "react-router-dom";
import { getVisibleIssues } from "../data/issues";

export default function ArchivePage() {
  const visibleIssues = getVisibleIssues();

  return (
    <section className="section">
      <div className="container">
        <div className="archive-header">
          <h1>Issue Archive</h1>
          <p>Access the current and previous Barróg magazine editions.</p>
        </div>
        {visibleIssues.length > 0 ? (
          <div className="grid three">
            {visibleIssues.map((issue) => (
              <article className="card issue-card" key={issue.id}>
                <img src={issue.coverImage} alt={`${issue.title} cover`} />
                <h2>{issue.title}</h2>
                <p>{issue.description}</p>
                <p className="muted">
                  {new Date(issue.releaseDate).toLocaleDateString()}
                </p>
                <Link to={`/issue/${issue.slug}`} className="button-link primary">
                  Open Issue
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <article className="card">
            <h2>Archive coming soon</h2>
            <p>The first Barróg issue will appear here after release.</p>
            <Link to="/" className="button-link secondary">
              Back Home
            </Link>
          </article>
        )}
      </div>
    </section>
  );
}
