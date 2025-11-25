import { ContactForm } from "../components/ContactForm";
import "../styles/forms.css";

export function ContactPage() {
  return (
    <>
        <div className="centerContent">
          <h2>Contact</h2>
          <ContactForm />
        </div>
    </>
  );
}
