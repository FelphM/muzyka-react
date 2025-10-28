import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ResetForm } from "../components/ResetForm";
import "../styles/forms.css";

export function ResetPage() {
  return (
    <>
      <Header></Header>
      <div className="centerContent">
        <h2>Reset Password</h2>
        <ResetForm></ResetForm>
      </div>
      <Footer></Footer>
    </>
  );
}
