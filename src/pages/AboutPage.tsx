import { aboutPageContent } from "../data/pageContent";

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container grid two">
        <article className="card">
          <h1>{aboutPageContent.title}</h1>
          {aboutPageContent.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {aboutPageContent.note ? (
            <p className="muted">{aboutPageContent.note}</p>
          ) : null}
        </article>

        <article className="card">
          <h2>{aboutPageContent.contributorsTitle}</h2>
          <div className="contributors-list">
            {aboutPageContent.contributors.map((contributor) => (
              <section className="contributor-card" key={contributor.nameAndTitle}>
                <img src={contributor.image} alt="" />
                <div>
                  <h3>{contributor.nameAndTitle}</h3>
                  <p>{contributor.body}</p>
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
