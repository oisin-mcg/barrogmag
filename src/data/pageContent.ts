import aboutContent from "../content/pages/about.json";

export type AboutContent = {
  title: string;
  intro: string[];
  note?: string;
  contributorsTitle: string;
  contributors: {
    image: string;
    nameAndTitle: string;
    body: string;
  }[];
};

export const aboutPageContent = aboutContent as AboutContent;
