import { isNextReleaseLive, siteSettings } from "./siteSettings";

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

export function getScheduledReleaseIssue() {
  if (!siteSettings.nextReleaseIssue) {
    return undefined;
  }

  return issues.find((issue) => issue.slug === siteSettings.nextReleaseIssue);
}

export function getCurrentIssue() {
  const scheduledIssue = getScheduledReleaseIssue();
  const visibleIssues = getVisibleIssues();

  if (scheduledIssue && isNextReleaseLive()) {
    return scheduledIssue;
  }

  return visibleIssues.find((issue) => issue.isCurrent) ?? visibleIssues[0];
}

export function getVisibleIssues() {
  const scheduledIssue = getScheduledReleaseIssue();

  if (!scheduledIssue || isNextReleaseLive()) {
    return issues;
  }

  return issues.filter((issue) => issue.slug !== scheduledIssue.slug);
}

export function hasPublicCurrentIssue() {
  return Boolean(getCurrentIssue());
}

export function hasPublicArchiveIssues() {
  return getVisibleIssues().length > 0;
}

export function isIssueHiddenUntilRelease(slug?: string) {
  const scheduledIssue = getScheduledReleaseIssue();

  if (!scheduledIssue || isNextReleaseLive()) {
    return false;
  }

  return !slug || slug === scheduledIssue.slug;
}

export function getIssueBySlug(slug?: string) {
  if (!slug) {
    return getCurrentIssue();
  }

  return getVisibleIssues().find((issue) => issue.slug === slug) ?? getCurrentIssue();
}
