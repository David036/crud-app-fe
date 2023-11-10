import { Button } from "antd";
import image from "../../../public/images/model.svg";
import removeIcon from "../../../public/icons/remove.svg";
import editIcon from "../../../public/icons/edit.svg";
import { CardProps } from "./types";

import styles from "./productCard.module.scss";

export default function ProductCard({
  title,
  description,
  price,
  handleDelete,
  product,
  handleEdit,
}: CardProps) {
  return (
    <div className={styles.productCard}>
      <div className={styles.btnsSection}>
        <Button
          onClick={() => handleDelete(product)}
          className={styles.deleteBtn}
        >
          <img src={removeIcon} alt="img" />
        </Button>
        <Button onClick={() => handleEdit(product)} className={styles.editBtn}>
          <img src={editIcon} alt="img" />
        </Button>
      </div>
      <img src={image} alt="img" />
      <div className={styles.cardContent}>
        <div className={styles.leftSection}>
          <span>{title}</span>
          <span>{description}</span>
        </div>
        <p>{price}</p>
      </div>
    </div>
  );
}
