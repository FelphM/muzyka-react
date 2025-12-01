import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../services/api"; // Import createUser

export function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Call the createUser API function
      await createUser({ username, email, password, role: "CUSTOMER", status: "ACTIVE" });

      alert("Sign up successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <label>
          Username
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Alice"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={5}
            maxLength={15}
            required
          />
        </label>
        <label>
          Email
          <input type="email" name="email" id="email" placeholder="alice@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        <Link to="/login">Already have an account? Log in</Link>

        <button type="submit" className="primaryButton">Registrarse</button>
      </form>
    </>
  );
}
