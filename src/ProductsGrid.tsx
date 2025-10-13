import { CardProduct } from "./CardProduct";
import type { Product } from "./Product";

export function ProductGrid({ products }: { products: Product[] }) {
    return (
        <>
            <div className="productGrid">
                {
                    products.map((product) => (
                        <CardProduct product={product}></CardProduct>)
                    )}

            </div>
        </>
    )
}
