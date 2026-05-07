import settingsContent from "../content/site/settings.json";

export type SiteSettings = {
  nextReleaseTitle: string;
  nextReleaseDate: string;
  nextReleaseNote: string;
};

export const siteSettings = settingsContent as SiteSettings;
