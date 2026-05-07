export type Issue = {
  id: string;
  slug: string;
  title: string;
  description: string;
  releaseDate: string;
  coverImage: string;
  pdfPath: string;
  isCurrent?: boolean;
};

const issueModules = import.meta.glob("../content/issues/*.json", {
  eager: true,
  import: "default"
});

export const issues = (Object.values(issueModules) as Issue[]).sort(
  (firstIssue, secondIssue) =>
    new Date(secondIssue.releaseDate).getTime() -
    new Date(firstIssue.releaseDate).getTime()
);

export function getCurrentIssue() {
  return issues.find((issue) => issue.isCurrent) ?? issues[0];
}

export function getIssueBySlug(slug?: string) {
  if (!slug) {
    return getCurrentIssue();
  }
  return issues.find((issue) => issue.slug === slug) ?? getCurrentIssue();
}
