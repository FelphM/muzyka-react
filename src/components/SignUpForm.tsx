import { Link } from "react-router-dom";

export function SignUpForm() {
  return (
    <>
      <form action="" method="post">
        <label>
          Username
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Alice"
            minLength={6}
            maxLength={15}
            required
          />
        </label>

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

        <label>
          Password
          <input type="password" name="password" id="password" required />
        </label>

        <Link to="/login">Already have an account? Log in</Link>

        <button type="submit">Registrarse</button>
      </form>
    </>
  );
}
