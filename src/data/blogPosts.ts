import { Author, getAuthorBySlug } from "./authors";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  publishedAt: string;
  author: Author;
};

type BlogPostContent = Omit<BlogPost, "author"> & {
  author: string;
};

const postModules = import.meta.glob("../content/blog/*.json", {
  eager: true,
  import: "default"
});

export const blogPosts = (Object.values(postModules) as BlogPostContent[])
  .map((post) => ({
    ...post,
    author: getAuthorBySlug(post.author) ?? {
      slug: "unknown",
      name: "Barróg",
      role: "Editorial team",
      photo: "/assets/branding/logo-icon.png"
    }
  }))
  .sort(
    (firstPost, secondPost) =>
      new Date(secondPost.publishedAt).getTime() -
      new Date(firstPost.publishedAt).getTime()
  );

export function getBlogPostBySlug(slug: string | undefined) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatPostDate(dateIso: string) {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(dateIso));
}
