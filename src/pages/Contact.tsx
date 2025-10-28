import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "../styles/forms.css";

export function ContactPage() {
  return (
    <>
      <Header></Header>
        <div className="centerContent">
          <h2>Contact</h2>
          <ContactForm />
        </div>
      <Footer></Footer>
    </>
  );
}
