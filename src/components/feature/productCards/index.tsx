import { ProductCardsProps } from "./types";
import ProductCard from "../productCard";

import styles from "./productCards.module.scss";

export default function ProductCards({
  products,
  handleDelete,
  handleEdit,
}: ProductCardsProps) {
  return (
    <div className={styles.cardsContainer}>
      {products &&
        products.map((product) => (
          <>
            <ProductCard
              handleDelete={handleDelete}
              product={product}
              handleEdit={handleEdit}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          </>
        ))}
    </div>
  );
}
