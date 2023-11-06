import { Link } from "react-router-dom";

import styles from "./navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <Link to="/products">Products</Link>
      <Link to="/newArrivals">New Arrivals</Link>
      <Link to="/users">Women</Link>
      <Link to="/fragrance">Fragrance</Link>
      <Link to="/shopAll">Shop All</Link>
      <Link to="/sale">Sale</Link>
      <Link to="/aboutUs">About Us</Link>
    </div>
  );
}
