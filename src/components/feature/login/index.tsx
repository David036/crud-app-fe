import { useContext, useState } from "react";
import styles from "./login.module.scss";
import { login } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth/context";
import { Button, Input } from "antd";
import { ErrorMessage } from "../../shared/errorMessage";
import {
  isValidEmail,
  passwordValidation,
} from "../../../utils/functions/validation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordSuccess, setPasswordSuccess] = useState<boolean>(false);

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
            isValidEmail(e.target.value, setEmailError);
          }}
          type="string"
        />
        {emailError && <ErrorMessage message={emailError} />}
        <p>Password</p>
        <Input.Password
          onChange={(e) => {
            setPassword(e.target.value);
            passwordValidation(e, setPasswordError, setPasswordSuccess);
          }}
          type="password"
        />
        {!passwordSuccess && <ErrorMessage message={passwordError} />}
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
