import { useContext, useState } from "react";
import styles from "./login.module.scss";
import { login } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth/context";
import { Button, Input } from "antd";

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
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="string"
        />
        <p>Password</p>
        <Input.Password
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
        />
        <Button className={styles.loginBtn} onClick={handleLogin}>
          Login
        </Button>
        <Button
          className={styles.signupBtn}
          onClick={() => navigate("/signup")}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}
