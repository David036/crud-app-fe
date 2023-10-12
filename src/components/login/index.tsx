import { useContext, useState } from "react";
import styles from "./login.module.scss";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/context";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setIsAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const isLoggedIn = await login(email, password);
    if (isLoggedIn?.data.token) {
      localStorage.setItem("accessToken", isLoggedIn?.data.token);
      navigate("/");
      setIsAuth(true);
    }
  };

  return (
    <div className={styles.loginSection}>
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <p>Email</p>
        <input onChange={(e) => setEmail(e.target.value)} type="string" />
        <p>Password</p>
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
        <button className={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>
        <button className={styles.signupBtn} onClick={() => navigate("/signup")}>Sign up</button>
      </div>
    </div>
  );
}
