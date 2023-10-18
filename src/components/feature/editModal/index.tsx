import { useState } from "react";
import styles from "./editModal.module.scss";
import { EditModalProps } from "./types";
import { updateUser } from "../../../services/userService";
import Modal from "../../shared/modal";
import { Button, Input } from "antd";

export default function EditModal({
  selectedUser,
  getUsers,
  editModalIsVisible,
  onClose,
  ...rest
}: EditModalProps) {
  const [newName, setNewName] = useState<string>(selectedUser.name);
  const [newSurname, setNewSurname] = useState<string>(selectedUser.surname);
  const [newAge, setNewAge] = useState<string>(`${selectedUser.age}`);

  const editUser = async () => {
    if (selectedUser) {
      const editedUser = {
        id: selectedUser.id,
        name: newName,
        surname: newSurname,
        age: parseInt(newAge),
      };
      await updateUser(editedUser);
      onClose();
      getUsers();
    }
  };

  return (
    <Modal
      isModalOpen={editModalIsVisible}
      onClose={() => {
        onClose();
        setNewName("");
        setNewSurname("");
        setNewAge("");
      }}
      {...rest}
    >
      <div className={styles.modalContent}>
        <h1>Edit Modal</h1>
        <div className={styles.inputsContainer}>
          <Input
            defaultValue={selectedUser?.name}
            onChange={(e) => setNewName(e.target.value)}
            type="string"
          />
          <Input
            defaultValue={selectedUser?.surname}
            onChange={(e) => setNewSurname(e.target.value)}
            type="string"
          />
          <Input
            onChange={(e) => setNewAge(e.target.value)}
            type="number"
            defaultValue={selectedUser?.age}
          />
        </div>
        <Button className={styles.editBtn} onClick={editUser}>
          Edit User
        </Button>
      </div>
    </Modal>
  );
}
