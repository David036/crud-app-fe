import { useContext, useEffect, useState } from "react";
import styles from "./signup.module.scss";
import { login, signup } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth/context";
import {
  passwordValidation,
  repeatPasswordValidation,
} from "../../../utils/functions/validation";
import { ErrorMessage } from "../../shared/errorMessage";
import openEyeIcon from "../../../public/icons/openEye.svg";
import closeEyeIcon from "../../../public/icons/closeEye.svg";

export default function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [repeatPasswordSuccess, setRepeatPasswordSuccess] =
    useState<boolean>(false);
  const [passwordSuccess, setPasswordSuccess] = useState<boolean>(false);
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  console.log(passwordError, passwordSuccess);

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

  useEffect(() => {
    repeatPasswordValidation(
      password,
      repeatPassword,
      setRepeatPasswordError,
      setRepeatPasswordSuccess
    );
  }, [password, repeatPassword]);

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
        <div className={styles.passwordSection}>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              passwordValidation(e, setPasswordError, setPasswordSuccess);
            }}
            type={showPassword ? "text" : "password"}
          />
          <img
            alt="show icon"
            src={showPassword ? closeEyeIcon : openEyeIcon}
            onClick={() => setShowPassword(!showPassword)}
            width={25}
          />
        </div>
        {!passwordSuccess && <ErrorMessage message={passwordError} />}
        <p>Confirm password</p>
        <div className={styles.passwordSection}>
          <input
            onChange={(e) => {
              setRepeatPassword(e.target.value);
            }}
            type={showConfirmPassword ? "text" : "password"}
          />
          <img
            alt="show icon"
            src={showConfirmPassword ? closeEyeIcon : openEyeIcon}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            width={25}
          />
        </div>
        {!repeatPasswordSuccess && (
          <ErrorMessage message={repeatPasswordError} />
        )}
        <button className={styles.signupBtn} onClick={handleSignup}>
          Sign up
        </button>
        <button onClick={() => navigate("/login")}>Login page</button>
      </div>
    </div>
  );
}
