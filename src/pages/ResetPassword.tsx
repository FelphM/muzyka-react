import { ResetForm } from "../components/ResetForm";
import "../styles/forms.css";

export function ResetPage() {
  return (
    <>
      <div className="centerContent">
        <h2>Reset Password</h2>
        <ResetForm></ResetForm>
      </div>
    </>
  );
}
