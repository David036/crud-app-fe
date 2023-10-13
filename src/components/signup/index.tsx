import { useContext, useState } from "react";
import styles from "./signup.module.scss";
import { login, signup } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/context";

export default function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);

  const handleSignup = async () => {
    if (repeatPassword === password && password) {
      const registeredUser = await signup(email, password);
      if (registeredUser) {
        const isLoggedIn = await login(email, password);
        if (isLoggedIn?.data.token) {
          localStorage.setItem("accessToken", isLoggedIn?.data.token);
          navigate("/");
          setIsAuth(true);
        }
      }
    }
  };

  return (
    <div className={styles.signupSection}>
      <div className={styles.signupContainer}>
        <h1>Sign up</h1>
        <p>Email</p>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
        />
        <p>Password</p>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
        />
        <p>Repeat password</p>
        <input
          onChange={(e) => setRepeatPassword(e.target.value)}
          type="password"
        />
        <button className={styles.signupBtn} onClick={handleSignup}>
          Sign up
        </button>
        <button onClick={() => navigate("/login")}>Login page</button>
      </div>
    </div>
  );
}
