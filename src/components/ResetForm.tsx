import { Link } from "react-router-dom";
import "../styles/forms.css";

export function ResetForm() {
  return (
    <>
      <form action="" method="post">
        <p>
          Please enter your email address. <br />
          We will send you a <strong> verification code</strong> to continue
        </p>
        <label>
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="alice@gmail.com"
            required
          />
        </label>
        <button type="submit">Send Code</button>
        <Link to="/login">Return to Log In</Link>
        <Link to="/signup">You dont have an account? Sign Up!</Link>
      </form>
    </>
  );
}
