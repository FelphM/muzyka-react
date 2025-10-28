type format = "Compact Disc" 
              | "Long Play" 
              | "Cassette" 
              | "DVD"
              | "VHS";

export type Product = {
    id: string,
    artist: string,
    name: string,
    image: {
        src: string,
        alt: string
    },
    price: number,
    format: format,
    description: string,
    link: string,
    slug: string,
};