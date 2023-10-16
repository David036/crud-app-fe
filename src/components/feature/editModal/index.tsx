import { useState } from "react";
import styles from "./editModal.module.scss";
import { ModalProps } from "./types";
import { updateUser } from "../../../services/userService";

export default function EditModal({
  setEditModalIsOpen,
  selectedUser,
  getUsers,
}: ModalProps) {
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
      setEditModalIsOpen(false);
      getUsers();
    }
  };

  return (
    <div
      onClick={() => {
        setEditModalIsOpen(false);
      }}
      className={styles.modalContainer}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalContent}
      >
        <button
          className={styles.closeBtn}
          onClick={() => setEditModalIsOpen(false)}
        >
          X
        </button>
        <h1>Edit modal</h1>
        <div className={styles.inputsContainer}>
          <input
            defaultValue={selectedUser?.name}
            onChange={(e) => setNewName(e.target.value)}
            type="string"
          ></input>
          <input
            defaultValue={selectedUser?.surname}
            onChange={(e) => setNewSurname(e.target.value)}
            type="string"
          ></input>
          <input
            onChange={(e) => setNewAge(e.target.value)}
            type="number"
            defaultValue={selectedUser?.age}
          ></input>
        </div>
        <button className={styles.editBtn} onClick={editUser}>Edit User</button>
      </div>
    </div>
  );
}
