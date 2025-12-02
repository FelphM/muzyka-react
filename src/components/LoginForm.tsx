import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/forms.css";
import { useAuth } from "../context/AuthContext";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password); // Use email as email
      // Check user role and navigate accordingly
      // Assuming user object is available in useAuth() context after successful login
      const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}'); 
      
      if (loggedInUser.role === 'admin') {
        alert("Admin Login successful!");
        navigate("/admin/dashboard");
      } else {
        alert("Login successful!");
        navigate("/profile");
      }
    } catch (error) {
      alert("Invalid email or password. Please try again.");
      console.error("Login attempt failed:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="alice@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Link to="/reset">I forgot my password</Link>
        </label>

        <button type="submit" className="primaryButton">Log In</button>

        <Link to="/signup">You dont have an account? Sign Up!</Link>
      </form>
    </>
  );
}
