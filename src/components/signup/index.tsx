import { useState } from "react";
import styles from "./signup.module.scss";
import { signup } from "../../services/authService";

export default function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignup = async () => {
    const registeredUser = await signup(email, password);
  };

  return (
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
      <input type="password" />
      <button onClick={handleSignup}>Sign up</button>
    </div>
  );
}
