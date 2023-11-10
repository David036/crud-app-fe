import Modal from "../../shared/modal";
import { CreateModalProps } from "./types";
import { Button, Input } from "antd";

import styles from "./createModal.module.scss";

export default function CreateProductModal({
  title,
  createModalIsVisible,
  handleCreate,
  setPrice,
  setDescription,
  setTitle,
  description,
  price,
  onClose,
  ...rest
}: CreateModalProps) {
  const createProduct = () => {
    handleCreate();
    onClose();
  };
  return (
    <Modal
      isModalOpen={createModalIsVisible}
      onClose={() => {
        onClose();
      }}
      {...rest}
    >
      <div className={styles.inputsContainer}>
        <div className={styles.inputsSection}>
          <span>Title</span>
          <Input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            type="text"
          />
        </div>
        <div className={styles.inputSection}>
          <span>Description</span>
          <Input
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
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
            value={price}
          />
        </div>
        <Button onClick={createProduct}>Add product</Button>
      </div>
    </Modal>
  );
}
