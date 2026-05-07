import { useEffect, useState } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import IssueFlipbook from "./IssueFlipbook";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

type PdfPageRendererProps = {
  pdfPath: string;
};

export default function PdfPageRenderer({ pdfPath }: PdfPageRendererProps) {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function renderPages() {
      setLoading(true);
      setError(null);
      setPages([]);

      try {
        const loadingTask = getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        const pageImages: string[] = [];

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Unable to create canvas context for PDF rendering.");
          }

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          pageImages.push(canvas.toDataURL("image/jpeg", 0.92));
        }

        if (active) {
          setPages(pageImages);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Failed to load the selected PDF."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    renderPages();
    return () => {
      active = false;
    };
  }, [pdfPath]);

  if (loading) {
    return <p>Loading issue pages...</p>;
  }

  if (error) {
    return (
      <div className="card">
        <h3>Could not load issue PDF</h3>
        <p>{error}</p>
      </div>
    );
  }

  return <IssueFlipbook pages={pages} />;
}
