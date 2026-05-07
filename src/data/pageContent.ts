import aboutContent from "../content/pages/about.json";

export type AboutContent = {
  title: string;
  intro: string[];
  note?: string;
  contributorsTitle: string;
  contributorsBody: string[];
  contributorsNote?: string;
};

export const aboutPageContent = aboutContent as AboutContent;
