import { Link, useParams } from "react-router-dom";
import PdfPageRenderer from "../components/issue/PdfPageRenderer";
import { getIssueBySlug } from "../data/issues";

export default function CurrentIssuePage() {
  const { slug } = useParams();
  const issue = getIssueBySlug(slug);

  return (
    <section className="section">
      <div className="container current-issue-layout">
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
        <div className="issue-reader card">
          <PdfPageRenderer pdfPath={issue.pdfPath} />
        </div>
      </div>
    </section>
  );
}
