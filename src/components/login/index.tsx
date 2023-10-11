import { useState } from "react";
import styles from "./login.module.scss";
import { login } from "../../services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    const isLoggedIn = await login(email, password);
    if (isLoggedIn?.data.token) {
      localStorage.setItem("accessToken", isLoggedIn?.data.token);
    }
    if (isLoggedIn) {
      setUsername(isLoggedIn?.data.userData.user.email);
    }
  };

  const handleLogout = () => {
    setUsername("");
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <p>Email</p>
      <input onChange={(e) => setEmail(e.target.value)} type="string" />
      <p>Password</p>
      <input onChange={(e) => setPassword(e.target.value)} type="password" />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <p>Username : {username}</p>
    </div>
  );
}
