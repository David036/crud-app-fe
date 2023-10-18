import { Button } from "antd";
import Modal from "../../shared/modal";
import { DeleteModalProps } from "./types";
import { removeUser } from "../../../services/userService";

import styles from "./deleteModal.module.scss";

export default function DeleteModal({
  deleteModalIsVisible,
  onClose,
  selectedUser,
  getUsers,
  ...rest
}: DeleteModalProps) {
  const deleteUser = async (id: string) => {
    await removeUser(id);
    getUsers();
  };
  return (
    <Modal
      isModalOpen={deleteModalIsVisible}
      onClose={() => {
        onClose();
      }}
      {...rest}
    >
      <h1>Do you want to remove user "{selectedUser.name}" ?</h1>
      <div className={styles.btnsSection}>
        <Button onClick={() => deleteUser(selectedUser.id)}>Delete</Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </Modal>
  );
}
