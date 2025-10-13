import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./App.css"
import "./Cart.css"
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'
import { BubbleText } from './BubbleText.tsx'
import { ProductGrid } from './ProductsGrid.tsx'
import { AllProducts } from './_db.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header></Header>
    <ProductGrid products={AllProducts}></ProductGrid>
    <BubbleText text='¿Tienes dudas? ¡Contactanos! ☆ Estamos para ayudarte ☆'></BubbleText>
    <Footer></Footer>
  </StrictMode>,
)
