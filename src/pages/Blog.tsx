import { useState } from "react";
import { FloatingUp } from "../components/FloatingUp";
import { SearchBar } from "../components/SearchBar";
import { PostList } from "../components/sets/PostList";
import "../styles/blog.css";

export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <FloatingUp />
      <SearchBar onSearch={setSearchTerm} placeholder="Search by title..." />
      <div className="centerContent">
        <PostList searchTerm={searchTerm} />
      </div>
    </>
  );
}
