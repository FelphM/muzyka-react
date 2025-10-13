import type { Product } from "./Product";

export function CardProduct({ product }: { product: Product }) {
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
