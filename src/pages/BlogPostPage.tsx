import { Link, Navigate, useParams } from "react-router-dom";
import { formatPostDate, getBlogPostBySlug } from "../data/blogPosts";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="section blog-post-page">
      <div className="container post-container">
        <Link className="back-link" to="/blog">
          Back to blog
        </Link>

        <header className="post-hero">
          <div className="post-kicker">
            <span>{post.author.name}</span>
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="author-line">
            <img src={post.author.photo} alt="" />
            <div>
              <strong>{post.author.name}</strong>
              <span>{post.author.role}</span>
            </div>
          </div>
        </header>

        <div className="post-body">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
