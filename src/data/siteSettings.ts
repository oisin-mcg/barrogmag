import settingsContent from "../content/site/settings.json";

export type SiteSettings = {
  nextReleaseTitle: string;
  nextReleaseDate: string;
  nextReleaseIssue?: string;
  upcomingMessage: string;
  releaseMessage: string;
};

export const siteSettings = settingsContent as SiteSettings;

export function isNextReleaseLive(now = Date.now()) {
  return now >= new Date(siteSettings.nextReleaseDate).getTime();
}

export function getCountdownMessage(now = Date.now()) {
  return isNextReleaseLive(now)
    ? siteSettings.releaseMessage
    : siteSettings.upcomingMessage;
}
