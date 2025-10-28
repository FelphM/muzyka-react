import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SignUpForm } from "../components/SignUpForm";
import "../styles/forms.css";

export function SignUpPage() {
  return (
    <>
      <Header></Header>
      <div className="centerContent">
        <h2>Sign Up</h2>
        <SignUpForm></SignUpForm>
      </div>
      <Footer></Footer>
    </>
  );
}
