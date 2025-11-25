import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/forms.css";
import { useAuth } from "../context/AuthContext";

export function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const foundUser = users.find(
      (u: any) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );

    if (foundUser) {
      alert("Login successful!");
      if (foundUser.username === 'admin') {
        login({ username: foundUser.username, email: foundUser.email, role: 'admin' });
        navigate("/admin/dashboard");
      } else {
        login({ username: foundUser.username, email: foundUser.email });
        navigate("/profile");
      }
    } else {
      alert("Invalid username/email or password.");
    }
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
