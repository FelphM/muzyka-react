import type { Category } from './Category';

type format = "Compact Disc" | "Long Play" | "Cassette" | "DVD" | "VHS" | "Vinyl" | "Blu-ray";

export type Product = {
    id: number,
    artist: string,
    name: string,
    imageUrl?: string,
    imageAlt?: string,
    price: number,
    format: format,
    description: string,
    category: Category,
    slug: string,
    stock: number,
    link?: string,
};