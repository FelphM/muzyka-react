import { Link } from "react-router-dom";
import type { Post } from "../types/BlogPost";

export function PostCard({ post }: { post: Post }) {
  // Helper to format date string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Link to={`/blog/${post.id}`} className="PostCard">
        <figure>
          <div className="postCardWrapper">
            <img src={post.bannerSrc} alt={post.bannerAlt} />
          </div>
        </figure>
        <h2>{post.cardTitle}</h2>
        <h3>
          Writen by {post.cardAuthor} | {formatDate(post.cardDate)}
        </h3>
        <p>{post.cardBrief}</p>
      </Link>
    </>
  );
}
