import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PdfPageRenderer from "../components/issue/PdfPageRenderer";
import {
  getIssueBySlug,
  getScheduledReleaseIssue,
  hasPublicArchiveIssues,
  isIssueHiddenUntilRelease
} from "../data/issues";
import { getCountdownMessage, siteSettings } from "../data/siteSettings";

function getTimeUntil(dateIso: string) {
  const now = Date.now();
  const target = new Date(dateIso).getTime();
  const diff = Math.max(target - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes };
}

export default function CurrentIssuePage() {
  const { slug } = useParams();
  const issue = getIssueBySlug(slug);
  const scheduledIssue = getScheduledReleaseIssue();
  const countdown = getTimeUntil(siteSettings.nextReleaseDate);
  const countdownMessage = getCountdownMessage();
  const showPrelaunchTeaser = isIssueHiddenUntilRelease(slug);
  const hasArchiveIssues = hasPublicArchiveIssues();
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [readerZoom, setReaderZoom] = useState(1);

  useEffect(() => {
    function closeReadingMode(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsReadingMode(false);
      }
    }

    document.addEventListener("keydown", closeReadingMode);
    return () => document.removeEventListener("keydown", closeReadingMode);
  }, []);

  useEffect(() => {
    if (!isReadingMode) {
      setReaderZoom(1);
    }
  }, [isReadingMode]);

  if (showPrelaunchTeaser || !issue) {
    return (
      <section className="section">
        <div className="container prelaunch-issue">
          <article className="card countdown-card">
            <p className="eyebrow">Coming soon</p>
            <h1>{siteSettings.nextReleaseTitle}</h1>
            <p>{countdownMessage}</p>
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
            {scheduledIssue ? (
              <p className="muted">
                {scheduledIssue.title} will be available here at release time.
              </p>
            ) : null}
            <Link className="button-link secondary" to="/">
              Back Home
            </Link>
          </article>
        </div>
      </section>
    );
  }

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
          <a
            className="button-link primary"
            href={issue.pdfPath}
            download
          >
            Download PDF
          </a>
          {hasArchiveIssues ? (
            <Link to="/archive" className="button-link secondary">
              Browse Archive
            </Link>
          ) : null}
        </div>
        <div className="issue-reader card" aria-label={`${issue.title} reader`}>
          <div className="reader-toolbar">
            <h2>Issue Reader</h2>
            <div className="reader-actions">
              {isReadingMode ? (
                <div className="zoom-controls" aria-label="Reader zoom controls">
                  <button
                    className="reader-icon-button"
                    type="button"
                    onClick={() => setReaderZoom((current) => Math.max(1, current - 0.15))}
                    aria-label="Zoom out"
                  >
                    -
                  </button>
                  <span>{Math.round(readerZoom * 100)}%</span>
                  <button
                    className="reader-icon-button"
                    type="button"
                    onClick={() => setReaderZoom((current) => Math.min(1.6, current + 0.15))}
                    aria-label="Zoom in"
                  >
                    +
                  </button>
                </div>
              ) : null}
              <a className="button-link secondary" href={issue.pdfPath} download>
                Download PDF
              </a>
              <button
                className="button-link secondary reader-mode-button"
                type="button"
                onClick={() => setIsReadingMode((current) => !current)}
              >
                {isReadingMode ? "Exit Reading Mode" : "Reading Mode"}
              </button>
            </div>
          </div>
          <PdfPageRenderer pdfPath={issue.pdfPath} zoom={isReadingMode ? readerZoom : 1} />
        </div>
      </div>
    </section>
  );
}
