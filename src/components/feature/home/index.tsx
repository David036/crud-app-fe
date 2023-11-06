import { Outlet } from "react-router-dom";
import Header from "../header";

import styles from "./home.module.scss";

export default function Home() {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
    </div>
  );
}
