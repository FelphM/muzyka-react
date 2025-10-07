import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./App.css"
import "./Cart.css"
import { CardProduct, type Product } from './CardProduct.tsx'
import { CardProductCart } from './CardProductCart.tsx'

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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CardProduct product={ bullets }></CardProduct>
    <CardProduct product={ audioSlave }></CardProduct>
    <CardProductCart product={ audioSlave }></CardProductCart>
  </StrictMode>,
)
