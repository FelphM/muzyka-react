import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { FloatingUp } from "../components/FloatingUp";
import { Breadcrumb } from "../components/Breadcrumb";
import "../styles/details.css";
import type { Post } from "../types/BlogPost";
import { getBlogPostById } from "../services/blogApi"; 

export function BlogPostDetails() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setError("Post ID is missing.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const fetchedPost = await getBlogPostById(postId);
        setPost(fetchedPost);
      } catch (err) {
        setError("Failed to load the post.");
        console.error(err);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <FloatingUp />
      <Breadcrumb 
        items={[
          { label: "Blog", path: "/blog" },
          { label: post.postTitle, path: `/blog/${post.id}` }
        ]}
      />
      <article className="blogPost">
        <figure>
          <img src={post.bannerSrc} alt={post.bannerAlt} />
        </figure>
        <h1>{post.postTitle}</h1>
        <div className="postMeta">
          <p>Written by {post.cardAuthor}</p>
          <p>{formatDate(post.cardDate)}</p>
        </div>
        <div className="postContent">
          {post.postContent?.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </>
  );
}