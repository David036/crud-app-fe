import ProductCard from "../productCard";

import styles from "./products.module.scss";

export default function Products() {
  return (
    <div className={styles.container}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
