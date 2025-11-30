type format = "Compact Disc" 
              | "Long Play" 
              | "Cassette" 
              | "DVD"
              | "VHS";

export type Product = {
    id: number,
    artist: string,
    name: string,
    imageUrl: string,
    imageAlt: string,
    price: number,
    format: format,
    description: string,

    slug: string,
};