import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PdfPageRenderer from "../components/issue/PdfPageRenderer";
import { getIssueBySlug } from "../data/issues";

export default function CurrentIssuePage() {
  const { slug } = useParams();
  const issue = getIssueBySlug(slug);
  const [isReadingMode, setIsReadingMode] = useState(false);

  useEffect(() => {
    function closeReadingMode(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsReadingMode(false);
      }
    }

    document.addEventListener("keydown", closeReadingMode);
    return () => document.removeEventListener("keydown", closeReadingMode);
  }, []);

  return (
    <section className="section">
      <div
        className={`container current-issue-layout ${
          isReadingMode ? "reading-mode-active" : ""
        }`}
      >
        <div className="issue-meta card">
          <h1>{issue.title}</h1>
          <p>{issue.description}</p>
          <p className="muted">
            Release date: {new Date(issue.releaseDate).toLocaleDateString()}
          </p>
          <Link to="/archive" className="button-link secondary">
            Browse Archive
          </Link>
        </div>
        <div className="issue-reader card" aria-label={`${issue.title} reader`}>
          <div className="reader-toolbar">
            <h2>Issue Reader</h2>
            <button
              className="button-link secondary reader-mode-button"
              type="button"
              onClick={() => setIsReadingMode((current) => !current)}
            >
              {isReadingMode ? "Exit Reading Mode" : "Reading Mode"}
            </button>
          </div>
          <PdfPageRenderer pdfPath={issue.pdfPath} />
        </div>
      </div>
    </section>
  );
}
