import { useState } from "react";
import { FloatingUp } from "../components/FloatingUp";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { ProductGrid } from "../components/sets/ProductGrid";

export function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <FloatingUp />
      <Header Logged={true} />
      <SearchBar onSearch={setSearchTerm} placeholder="Search by name..." />
      <ProductGrid searchTerm={searchTerm} />
      <Footer />
    </>
  );
}
