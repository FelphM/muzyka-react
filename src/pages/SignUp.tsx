import { SignUpForm } from "../components/SignUpForm";
import "../styles/forms.css";

export function SignUpPage() {
  return (
    <>
      <div className="centerContent">
        <h2>Sign Up</h2>
        <SignUpForm></SignUpForm>
      </div>
    </>
  );
}
