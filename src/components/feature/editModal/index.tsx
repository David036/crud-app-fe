import styles from "./editModal.module.scss";
import { EditModalProps } from "./types";
import Modal from "../../shared/modal";
import { Button, Input } from "antd";

export default function EditModal({
  editModalIsVisible,
  onClose,
  editFunction,
  newValues,
  ...rest
}: EditModalProps) {
  return (
    <Modal
      isModalOpen={editModalIsVisible}
      onClose={() => {
        onClose();
        newValues.map((item: any) => {
          item.changeValue("");
        });
      }}
      {...rest}
    >
      <div className={styles.modalContent}>
        <h1>Edit Modal</h1>
        <div className={styles.inputsContainer}>
          {newValues.map((item: any) => (
            <>
              <Input
                defaultValue={item.value}
                onChange={(e) => item.changeValue(e.target.value)}
                type={item.type}
              />
            </>
          ))}
        </div>
        <Button className={styles.editBtn} onClick={editFunction}>
          Edit User
        </Button>
      </div>
    </Modal>
  );
}
