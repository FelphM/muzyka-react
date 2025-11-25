import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (event: FormEvent) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const userExists = users.some((u: any) => u.username === username || u.email === email);

    if (userExists) {
      alert("User with this username or email already exists.");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert("Sign up successful! Please log in.");
    navigate("/login");
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

        <button type="submit">Registrarse</button>
      </form>
    </>
  );
}
