import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FloatingUp } from "../components/FloatingUp";
import { Breadcrumb } from "../components/Breadcrumb";
import { getBlogPostById } from "../services/blogApi";
import type { Post } from "../types/BlogPost";
import "../styles/details.css";

export function BlogPostDetails() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      setError("Post ID is missing.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      try {
        const fetchedPost = await getBlogPostById(postId);
        if (fetchedPost) {
          setPost({
            ...fetchedPost,
            card: {
              ...fetchedPost.card,
              date: new Date(fetchedPost.card.date), // Ensure date is a Date object
            }
          });
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError("Failed to load the blog post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div className="centerContent">Loading post...</div>;
  }

  if (error) {
    return <div className="centerContent error-message">{error}</div>;
  }

  if (!post) {
    return <div className="centerContent">Post not found.</div>;
  }

  return (
    <>
      <FloatingUp />
      <Breadcrumb
        items={[
          { label: "Blog", path: "/blog" },
          { label: post.post.title, path: `/blog/${post.id}` },
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
          {post.post.content}
        </div>
      </article>
    </>
  );
}