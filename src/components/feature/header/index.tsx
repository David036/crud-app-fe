import { useContext } from "react";
import UserAccount from "../userAccount";
import Logo from "../logo";
import { AuthContext } from "../../../context/auth/context";
import Navbar from "../navbar";

import styles from "./header.module.scss";

export default function Header() {
  const { isAuth } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <Logo />
        <Navbar />
        {isAuth && <UserAccount />}
      </div>
    </div>
  );
}
