import { useState } from "react";
import { FloatingUp } from "../components/FloatingUp";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { PostList } from "../components/sets/PostList";
import "../styles/blog.css";

export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <FloatingUp />
      <Header Admin={true} />
      <SearchBar onSearch={setSearchTerm} placeholder="Search by title..." />
      <div className="centerContent">
        <PostList searchTerm={searchTerm} />
      </div>
      <Footer />
    </>
  );
}
