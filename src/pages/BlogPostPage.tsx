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

        {post.coverImage ? (
          <figure className="post-cover-image">
            <img src={post.coverImage} alt={post.coverImageAlt ?? ""} />
          </figure>
        ) : null}

        <div className="post-body">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {post.photos?.length ? (
          <div className="post-photo-gallery" aria-label="Post photos">
            {post.photos.map((photo) => (
              <figure className="post-photo" key={`${photo.image}-${photo.caption ?? ""}`}>
                <img src={photo.image} alt={photo.alt ?? ""} />
                {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
