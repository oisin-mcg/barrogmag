import { Link } from "react-router-dom";
import { blogPosts, formatPostDate } from "../data/blogPosts";

export default function BlogPage() {
  const [featuredPost, ...remainingPosts] = blogPosts;

  return (
    <section className="section blog-page">
      <div className="container">
        <div className="blog-header">
          <p className="eyebrow">Editorial updates</p>
          <h1>Blog</h1>
          <p>
            Notes from the Barróg editors and authors: issue announcements,
            contributor updates, and behind-the-scenes posts between releases.
          </p>
        </div>

        {featuredPost ? (
          <article className={`featured-post${featuredPost.coverImage ? "" : " no-media"}`}>
            {featuredPost.coverImage ? (
              <Link className="featured-post-media" to={`/blog/${featuredPost.slug}`}>
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.coverImageAlt ?? ""}
                />
              </Link>
            ) : null}
            <div className="featured-post-content">
              <div className="post-kicker">
                <span>Latest post</span>
                <time dateTime={featuredPost.publishedAt}>
                  {formatPostDate(featuredPost.publishedAt)}
                </time>
              </div>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="post-footer">
                <div className="author-line">
                  <img src={featuredPost.author.photo} alt="" />
                  <div>
                    <strong>{featuredPost.author.name}</strong>
                    <span>{featuredPost.author.role}</span>
                  </div>
                </div>
                <Link className="button-link primary" to={`/blog/${featuredPost.slug}`}>
                  Read post
                </Link>
              </div>
            </div>
          </article>
        ) : null}

        <div className="post-list" aria-label="Blog posts">
          {remainingPosts.map((post) => (
            <article className="post-card" key={post.slug}>
              {post.coverImage ? (
                <Link className="post-card-media" to={`/blog/${post.slug}`}>
                  <img src={post.coverImage} alt={post.coverImageAlt ?? ""} />
                </Link>
              ) : null}
              <div className="post-kicker">
                <span>{post.author.name}</span>
                <time dateTime={post.publishedAt}>
                  {formatPostDate(post.publishedAt)}
                </time>
              </div>
              <h2>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <div className="author-line">
                <img src={post.author.photo} alt="" />
                <div>
                  <strong>{post.author.name}</strong>
                  <span>{post.author.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
