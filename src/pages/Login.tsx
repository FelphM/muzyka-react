import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <>
      <Header></Header>
      <div className="centerContent">
        <h2>Login</h2>
        <LoginForm></LoginForm>
      </div>
      <Footer></Footer>
    </>
  );
}
