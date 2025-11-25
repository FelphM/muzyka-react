import { useParams } from "react-router-dom";
import { FloatingUp } from "../components/FloatingUp";
import { Breadcrumb } from "../components/Breadcrumb";
import "../styles/details.css";
import type { Post } from "../types/BlogPost";
import { getPosts } from "../services/db";

export function BlogPostDetails() {
  const { slug } = useParams();
  const posts = getPosts();
  const post = posts.find((p: Post) => p.id === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <FloatingUp />
      <Breadcrumb 
        items={[
          { label: "Blog", path: "/blog" },
          { label: post.post.title, path: `/blog/${post.id}` }
        ]}
      />
      <article className="blogPost">
        <figure>
          <img src={post.banner.src} alt={post.banner.alt} />
        </figure>
        <h1>{post.post.title}</h1>
        <div className="postMeta">
          <p>Written by {post.card.author}</p>
          <p>
            {post.card.date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="postContent">
          {post.post.content.map((content, index) => (
            <div key={index}>{content}</div>
          ))}
        </div>
      </article>
    </>
  );
}