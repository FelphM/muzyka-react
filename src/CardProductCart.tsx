import type { Product } from "./Product";

export function CardProductCart({ product }: { product: Product}) {
    return (
        <>
            <article className="cardProductCart">
                <figure>
                    <img src={product.image} alt="" />
                    <figcaption>
                        <a
                            href="https://www.discogs.com/release/727005-Billy-Talent-Billy-Talent-II"
                        >Mas detalles de esta edicion aqui</a>
                    </figcaption>
                </figure>
                <div className="product-details">
                    <h2>{product.title}</h2>
                    <h3>${product.price}</h3>
                    <button>Quitar del carrito</button>
                    <p>
                        {product.details?.description}
                    </p>
                    <details>
                        <summary>Mas detalles</summary>
                        <dl>
                            <dt>Label:</dt>
                            <dd>Atlantic – 7567-83941-2</dd>

                            <dt>Format:</dt>
                            <dd>CD, Album</dd>

                            <dt>Country:</dt>
                            <dd>Europe</dd>

                            <dt>Released:</dt>
                            <dd>Jun 26, 2006</dd>

                            <dt>Genre:</dt>
                            <dd>Rock</dd>

                            <dt>Style:</dt>
                            <dd>Alternative Rock, Pop Punk, Punk</dd>
                        </dl>
                    </details>
                </div>
            </article>
        </>
    )
}