import { useEffect, useState } from "react";
import { MockData } from "../../services/api";
import type { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard";
import "../../styles/product.css"

interface ProductGridProps {
  searchTerm: string;
}

export function ProductGrid({ searchTerm }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    MockData.connect();
    let mounted = true;

    (async () => {
      try {
        const data = await MockData.fetchData("PRODUCT");
        if (!mounted) return;
        if (Array.isArray(data)) {
          setProducts(data as Product[]);
        } else {
          console.warn("MockData.fetchData returned non-array:", data);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    })();

    return () => {
      mounted = false;
      MockData.disconnect();
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  return (
    <section className="ProductGrid fullContent">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product: Product, index: number) => (
          <ProductCard
          key={(product as any).id ?? index}
          product={product}
          ></ProductCard>
        ))
      ) : (
        <p>No se encontraron productos para mostrar.</p>
      )}
    </section>
  );
}
