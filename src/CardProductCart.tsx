import type { ProductProperties } from "./CardProduct";

export function CardProductCart({ product }: ProductProperties) {
    return (
        <>
            <article className="cardProductCart">
                <figure>
                    <img src="/img/billy_talent_ii_front.jpg" alt="" />
                    <figcaption>
                        <a
                            href="https://www.discogs.com/release/727005-Billy-Talent-Billy-Talent-II"
                        >Mas detalles de esta edicion aqui</a>
                    </figcaption>
                </figure>
                <div className="product-details">
                    <h2>Billy Talent II</h2>
                    <h3>$15,990</h3>
                    <button>Quitar del carrito</button>
                    <p>
                        Billy Talent II es el segundo álbum de estudio de la banda
                        canadiense de punk rock Billy Talent, publicado el 27 de junio de
                        2006. El álbum debutó en el número 1 en la Canadian Albums Chart,
                        vendiendo 48.000 copias en su primera semana.​ El álbum también
                        alcanzó el número 1 en las listas de álbumes de Alemania.
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