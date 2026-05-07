import HTMLFlipBook from "react-pageflip";
import type { CSSProperties } from "react";

type IssueFlipbookProps = {
  pages: string[];
  zoom?: number;
};

export default function IssueFlipbook({ pages, zoom = 1 }: IssueFlipbookProps) {
  if (pages.length === 0) {
    return (
      <div className="card">
        <h3>No pages available</h3>
        <p>
          Add a PDF file to <code>public/issues</code> and update issue metadata.
        </p>
      </div>
    );
  }

  return (
    <div
      className="flipbook-wrap"
      style={{ "--reader-zoom": zoom } as CSSProperties}
    >
      <HTMLFlipBook
        width={380}
        height={540}
        size="stretch"
        minWidth={240}
        maxWidth={1100}
        minHeight={320}
        maxHeight={1400}
        maxShadowOpacity={0.35}
        showCover
        mobileScrollSupport
        className="flipbook"
        style={{}}
        startPage={0}
        drawShadow
        flippingTime={650}
        usePortrait
        startZIndex={0}
        autoSize
        clickEventForward
        useMouseEvents
        swipeDistance={30}
        showPageCorners
        disableFlipByClick={false}
      >
        {pages.map((pageSrc, index) => (
          <article className="flip-page" key={`${pageSrc}-${index}`}>
            <img src={pageSrc} alt={`Magazine page ${index + 1}`} />
          </article>
        ))}
      </HTMLFlipBook>
    </div>
  );
}
