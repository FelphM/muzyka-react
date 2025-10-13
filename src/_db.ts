import type { Product } from "./Product"

const bullets: Product = {
    soldOut: false,
    image: "/img/bullets_front.jpg",
    title: "Bullets",
    price: 69990
}

const audioSlave: Product = {
    soldOut: true,
    image: "img/audioslave.jpg",
    title: "AudioSlave - AudioSlave",
    price: 12990,
}

export const TableProducts: Product[] = [
    bullets,
    audioSlave,
]

export const Tables: any[] = [
    TableProducts
]