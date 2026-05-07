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
          {aboutPageContent.contributorsBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {aboutPageContent.contributorsNote ? (
            <p className="muted">{aboutPageContent.contributorsNote}</p>
          ) : null}
        </article>
      </div>
    </section>
  );
}
