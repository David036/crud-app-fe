import image from "../../../public/images/sticker.webp";

import styles from "./productCard.module.scss";

export default function ProductCard() {
  return (
    <div className={styles.productCard}>
      <img src={image} alt="img" />
      <div className={styles.cardContent}>
        <span>Title</span>
        <span>description</span>
      </div>
    </div>
  );
}
