import { Link } from "react-router-dom";
import type { Post } from "../types/BlogPost";

export function PostCard({ post }: { post: Post }) {
  return (
    <>
      <Link to={`/blog/${post.id}`} className="PostCard">
      <figure>
        <div className="postCardWrapper">
          <img src={post.banner.src} alt={post.banner.alt} />
        </div>
      </figure>
        <h2>{post.card.title}</h2>
        <h3>
          Writen by {post.card.author} |{" "}
          {post.card.date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
        <p>{post.card.brief}</p>
      </Link>
    </>
  );
}

