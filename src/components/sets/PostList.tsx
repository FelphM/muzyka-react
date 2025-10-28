import { useEffect, useState } from "react";
import { MockData } from "../../services/api";
import type { Post } from "../../types/BlogPost";
import { PostCard } from "../PostCard";
import "../../styles/blog.css"

interface PostListProps {
    searchTerm: string;
}

export function PostList({ searchTerm }: PostListProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    useEffect(() => {
        MockData.connect();
        let mounted = true;

        (async () => {
            try {
                const data = await MockData.fetchData("POST");
                if (!mounted) return;
                if (Array.isArray(data)) {
                    setPosts(data as Post[]);
                } else {
                    console.warn("MockData.fetchData returned non-array:", data);
                }
            } catch (err) {
                console.error("Failed to fetch posts", err);
            }
        })();

        return () => {
            mounted = false;
            MockData.disconnect();
        };
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post =>
                post.card.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
    }, [searchTerm, posts]);

    return (
        <section className="PostList fullContent">
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post: Post, index: number) => (
                    <PostCard
                        key={(post as any).id ?? index}
                        post={post}
                    />
                ))
            ) : (
                <p>No se encontraron publicaciones para mostrar.</p>
            )}
        </section>
    );
}