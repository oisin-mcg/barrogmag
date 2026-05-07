export type Author = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  bio?: string;
};

const authorModules = import.meta.glob("../content/authors/*.json", {
  eager: true,
  import: "default"
});

export const authors = Object.values(authorModules) as Author[];

export function getAuthorBySlug(slug: string) {
  return authors.find((author) => author.slug === slug);
}
