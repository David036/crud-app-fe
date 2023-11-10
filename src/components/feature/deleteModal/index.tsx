import { Button } from "antd";
import Modal from "../../shared/modal";
import { DeleteModalProps } from "./types";

import styles from "./deleteModal.module.scss";

export default function DeleteModal({
  deleteModalIsVisible,
  onClose,
  selectedUserTitle,
  deleteFunction,
  selectedUserId,
  ...rest
}: DeleteModalProps) {
  return (
    <Modal
      isModalOpen={deleteModalIsVisible}
      onClose={() => {
        onClose();
      }}
      {...rest}
    >
      <h1>Do you want to remove "{selectedUserTitle}" ?</h1>
      <div className={styles.btnsSection}>
        <Button onClick={() => deleteFunction(selectedUserId)}>Delete</Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </Modal>
  );
}
