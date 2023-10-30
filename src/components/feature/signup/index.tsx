import { useContext, useEffect, useState } from "react";
import styles from "./signup.module.scss";
import { login, signup } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth/context";
import {
  isValidEmail,
  passwordValidation,
  repeatPasswordValidation,
} from "../../../utils/functions/validation";
import { ErrorMessage } from "../../shared/errorMessage";
import openNotification from "../../shared/notification";
import { NotificationTypes } from "../../shared/notification/types";
import { Button, Input } from "antd";

export default function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>("");
  const [repeatPasswordSuccess, setRepeatPasswordSuccess] =
    useState<boolean>(false);
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);

  const handleSignup = async () => {
    if (!emailError && !passwordError && !repeatPasswordError) {
      const registeredUser = await signup(email, password);
      if (registeredUser?.data.success) {
        const isLoggedIn = await login(email, password);
        if (isLoggedIn?.data.accessToken) {
          localStorage.setItem("accessToken", isLoggedIn?.data.accessToken);
          openNotification({
            type: NotificationTypes.SUCCESS,
            message: "You have successfully registered",
            description: "",
          });
          navigate("/");
          setIsAuth(true);
        }
      } else {
        openNotification({
          type: NotificationTypes.ERROR,
          message: "You already have an account",
          description: "",
        });
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
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
            isValidEmail(e.target.value, setEmailError);
          }}
          type="email"
        />
        <ErrorMessage message={emailError} />
        <p>Password</p>
        <Input.Password
          onChange={(e) => {
            setPassword(e.target.value);
            passwordValidation(e, setPasswordError);
          }}
          placeholder="Password"
        />
        <ErrorMessage message={passwordError} />
        <p>Confirm password</p>
        <Input.Password
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
          placeholder="Confirm password"
        />
        {!repeatPasswordSuccess && (
          <ErrorMessage message={repeatPasswordError} />
        )}
        <Button className={styles.signupBtn} onClick={handleSignup}>
          Sign up
        </Button>
        <Button className={styles.loginBtn} onClick={() => navigate("/login")}>
          Login page
        </Button>
      </div>
    </div>
  );
}
