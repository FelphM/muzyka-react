export type Product = {
    title: string
    price: number
    soldOut: boolean
    image: string
    details?: ProductDetails
}

export interface ProductDetails {
    description: string,
    Label: string,
    Format: string,
    Country?: string,
    Released?: string,
    Genre?: string,
    Style?: string,
}