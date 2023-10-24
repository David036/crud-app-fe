import { Button } from "antd";
import Modal from "../../shared/modal";
import { DeleteModalProps } from "./types";
import { removeUser } from "../../../services/userService";

import styles from "./deleteModal.module.scss";
import openNotification from "../../shared/notification";
import { NotificationTypes } from "../../shared/notification/types";

export default function DeleteModal({
  deleteModalIsVisible,
  onClose,
  selectedUser,
  getUsers,
  setCurrentPage,
  ...rest
}: DeleteModalProps) {
  const deleteUser = async (id: string) => {
    const removedUser = await removeUser(id);

    if (removedUser?.data.success) {
      openNotification({
        type: NotificationTypes.SUCCESS,
        message: `User "${removedUser.data.data.name} ${removedUser.data.data.surname}" was successfully deleted`,
        description: "",
      });
      onClose();
      setCurrentPage(1);
      getUsers();
    }
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
