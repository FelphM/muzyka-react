import { Accordion } from "../components/Accordion";
import { ContactForm } from "../components/ContactForm";
import { FloatingUp } from "../components/FloatingUp";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Map } from "../components/Map";
import "../styles/blog.css";

export const faqData = [
  {
    title: "Are all your products (CDs/Vinyl/Cassettes) original?",
    content:
      "Yes, absolutely. We only sell **100% genuine and officially licensed** music media. All our products are sourced directly from authorized distributors and record labels.",
  },
  {
    title: "How long does it take to ship my order?",
    content:
      "We typically process and ship orders within **1-3 business days**. Once shipped, delivery times depend on your location and the selected shipping method (usually 3-7 additional business days).",
  },
  {
    title: "What is your return policy for open CDs or Vinyl?",
    content:
      "We accept returns only for **sealed items** within 14 days of receipt. Opened CDs, vinyl, or cassettes cannot be returned or exchanged unless they are **defective or damaged** upon arrival. Please contact us immediately if your media arrives damaged.",
  },
  {
    title: "Can I pre-order upcoming albums?",
    content:
      "Yes, we offer pre-orders for many new releases. Pre-ordered items will ship on or around the official release date, which is listed on the product page.",
  },
  {
    title: "What payment methods do you accept?",
    content:
      "We accept all major credit cards (Visa, MasterCard, Amex), debit cards, and secure digital payment methods like PayPal and [Menciona tu método de pago local, ej. WebPay].",
  },
];

export function AboutPage() {
  return (
    <>
      <Header></Header>
      <FloatingUp></FloatingUp>
      <div className="centerContent">
        <h2>We enjoy the Muzyka</h2>
        <p>
          Since 1995, Muzyka has been Santiago's premier destination for music
          lovers. We're passionate about bringing the joy of music to our
          community through our carefully curated selection of instruments,
          equipment, and accessories. With over 25 years of experience, our
          knowledgeable staff is here to help you find the perfect sound you're
          looking for.
        </p>

        <h2>Where we are</h2>
        <p>
          Visit us at Av. Providencia 1234, Providencia, Santiago. Located in
          the heart of Santiago, just two blocks from Metro Manuel Montt. Our
          store is open Monday through Saturday, from 10:00 AM to 7:00 PM.
        </p>
        <Map></Map>

        <Accordion items={faqData} sectionTitle="Frequently Asked Questions" />

        <h2>Talk with us!</h2>
        <ContactForm></ContactForm>
      </div>
      <Footer></Footer>
    </>
  );
}
