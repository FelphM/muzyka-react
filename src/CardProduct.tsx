export interface Product {
    soldOut: boolean;
    image: string;
    title: string;
    price: number;
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

export interface ProductProperties {
    product: Product;
    productDetails?: ProductDetails
}

export function CardProduct({ product }: ProductProperties) {
    return (
        <article className="cardProduct">
            {product.soldOut && <p className="strike">sold-out</p>}
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <h3>${product.price}</h3>
            <button disabled={product.soldOut}>Añadir al carrito</button>
        </article>
    );
}
