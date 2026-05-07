import { Link } from "react-router-dom";
import { issues } from "../data/issues";

export default function ArchivePage() {
  return (
    <section className="section">
      <div className="container">
        <div className="archive-header">
          <h1>Issue Archive</h1>
          <p>Access the current and previous Barróg magazine editions.</p>
        </div>
        <div className="grid three">
          {issues.map((issue) => (
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
      </div>
    </section>
  );
}
