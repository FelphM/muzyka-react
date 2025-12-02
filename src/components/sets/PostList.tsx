import { useEffect, useState } from "react";
import type { Post } from "../../types/BlogPost";
import { PostCard } from "../PostCard";
import "../../styles/blog.css";
import { useAuth } from '../../context/AuthContext'; // Import useAuth

interface PostListProps {
    searchTerm: string;
    onEdit: (post: Post) => void;
    onDelete: (postId: string) => void;
    posts: Post[]; // Receive posts as a prop from parent Blog page
}

export function PostList({ searchTerm, onEdit, onDelete, posts }: PostListProps) {
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const { user } = useAuth(); // Get user from AuthContext
    const isAdmin = user?.role === 'admin';

    // This useEffect now just filters posts received as props
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post =>
                post.card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.card.brief.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.card.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
    }, [searchTerm, posts]);

    // formatDate removed (not used)

    return (
        <section className="PostList fullContent">
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post: Post) => (
                    <div key={post.id} className="post-item-wrapper">
                        <PostCard
                            post={{
                                ...post,
                                card: {
                                    ...post.card,
                                    date: new Date(post.card.date), // Ensure date is a Date object
                                },
                            }}
                        />
                        {isAdmin && (
                            <div className="admin-actions">
                                <button onClick={(e) => { e.stopPropagation(); onEdit(post); }} className="edit-button">Edit</button>
                                <button onClick={(e) => { e.stopPropagation(); onDelete(post.id); }} className="delete-button">Delete</button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No se encontraron publicaciones para mostrar.</p>
            )}
        </section>
    );
}