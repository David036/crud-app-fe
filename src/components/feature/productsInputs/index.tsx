import { Button, Input } from "antd";
import styles from "./productsInputs.module.scss";
import { ProductsInputsProps } from "./types";

export default function ProductsInputs({
  setTitle,
  setDescription,
  setPrice,
  handleCreate,
}: ProductsInputsProps) {
  const createProduct = () => {
    handleCreate();
  };

  return (
    <div className={styles.inputsContainer}>
      <div className={styles.inputsSection}>
        <span>Title</span>
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
        />
      </div>
      <div className={styles.inputSection}>
        <span>Description</span>
        <Input
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          type="text"
        />
      </div>
      <div className={styles.inputSection}>
        <span>Price</span>
        <Input
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          type="text"
        />
      </div>
      <Button onClick={createProduct}>Add product</Button>
    </div>
  );
}
