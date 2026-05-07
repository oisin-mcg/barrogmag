import { Link } from "react-router-dom";
import { getCurrentIssue } from "../data/issues";

function getTimeUntil(dateIso: string) {
  const now = Date.now();
  const target = new Date(dateIso).getTime();
  const diff = Math.max(target - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes };
}

export default function HomePage() {
  const currentIssue = getCurrentIssue();
  const countdown = getTimeUntil(currentIssue.releaseDate);

  return (
    <section className="section">
      <div className="container">
        <div className="grid two">
          <article className="card">
            <img
              src="/assets/branding/logo-full.png"
              alt="Barróg full logo"
              className="home-logo"
            />
            <h1>Digital Magazine</h1>
            <p>
              A home for features, essays, and visual stories from Barróg.
              Replace this intro text with your final messaging.
            </p>
            <div className="cta-row">
              <Link className="button-link primary" to={`/issue/${currentIssue.slug}`}>
                Read Current Issue
              </Link>
              <Link className="button-link secondary" to="/archive">
                View Archive
              </Link>
            </div>
          </article>

          <article className="card countdown-card">
            <h2>Countdown to Next Issue</h2>
            <p className="countdown-label">{currentIssue.title} release</p>
            <div className="countdown-grid">
              <div>
                <strong>{countdown.days}</strong>
                <span>Days</span>
              </div>
              <div>
                <strong>{countdown.hours}</strong>
                <span>Hours</span>
              </div>
              <div>
                <strong>{countdown.minutes}</strong>
                <span>Minutes</span>
              </div>
            </div>
            <p className="muted">
              Change the release date in issue data to keep this countdown accurate.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
