import { useState } from "react";
import { FloatingUp } from "../components/FloatingUp";
import { SearchBar } from "../components/SearchBar";
import { ProductGrid } from "../components/sets/ProductGrid";

export function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <FloatingUp />
      <SearchBar onSearch={setSearchTerm} placeholder="Search by name..." />
      <ProductGrid searchTerm={searchTerm} />
    </>
  );
}
