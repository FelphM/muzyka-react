import { useEffect, useState } from "react";
import type { Post } from "../../types/BlogPost";
import { PostCard } from "../PostCard";
import "../../styles/blog.css";
import { useAuth } from '../../context/AuthContext'; 

interface PostListProps {
    searchTerm: string;
    onEdit: (post: Post) => void;
    onDelete: (postId: string) => void;
    posts: Post[]; 
}

export function PostList({ searchTerm, onEdit, onDelete, posts }: PostListProps) {
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const { user } = useAuth(); 
    const isAdmin = user?.role === 'admin';

    
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredPosts(posts);
        } else {
            const lowercasedFilter = searchTerm.toLowerCase();
            const filtered = posts.filter(post =>
                post.cardTitle.toLowerCase().includes(lowercasedFilter) ||
                (post.cardBrief && post.cardBrief.toLowerCase().includes(lowercasedFilter)) ||
                (post.cardAuthor && post.cardAuthor.toLowerCase().includes(lowercasedFilter))
            );
            setFilteredPosts(filtered);
        }
    }, [searchTerm, posts]);

    return (
        <section className="PostList fullContent">
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post: Post) => (
                    <div key={post.id} className="post-item-wrapper">
                        <PostCard post={post} />
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