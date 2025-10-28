import { Link } from "react-router-dom";
import "../styles/forms.css";

export function LoginForm() {
  return (
    <>
      <form action="" method="post">
        <label>
          Username or Email
          <input
            type="text"
            name="usernameOrEmail"
            id="usernameOrEmail"
            placeholder="Alice"
            required
          />
        </label>
        <label>
          Password
          <input type="password" name="password" id="password" required />
          <Link to="/reset">I forgot my password</Link>
        </label>

        <button type="submit">Log In</button>

        <Link to="/signup">You dont have an account? Sign Up!</Link>
      </form>
    </>
  );
}
