import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/forms.css";

export function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // TODO: Replace with actual authentication logic (e.g., API call)
    console.log("Logging in with:", { usernameOrEmail, password });

    // Simulate a successful login and redirect
    alert("Login successful! Redirecting to your profile.");
    navigate("/profile");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            name="usernameOrEmail"
            id="usernameOrEmail"
            placeholder="Alice"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Link to="/reset">I forgot my password</Link>
        </label>

        <button type="submit">Log In</button>

        <Link to="/signup">You dont have an account? Sign Up!</Link>
      </form>
    </>
  );
}
