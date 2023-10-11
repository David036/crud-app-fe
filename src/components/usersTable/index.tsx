import { removeUser, searchUsers } from "../../services/userService";
import EditModal from "../editModal";
import { UserTableProps, UserTypes } from "./types";
import styles from "./usersTable.module.scss";
import { useEffect, useState } from "react";

export default function UsersTable({
  users,
  getUsers,
  setUsers,
}: UserTableProps) {
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserTypes | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const deleteUser = async (id: string) => {
    await removeUser(id);
    getUsers();
  };

  const handleEdit = (item: UserTypes) => {
    setSelectedUser(item);
    setEditModalIsOpen(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = async () => {
    const searchedUsers = await searchUsers(searchValue);
    if (searchedUsers) {
      setUsers(searchedUsers);
    }
  };

  return (
    <div className={styles.usersTable}>
      <input onChange={(e) => setSearchValue(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {users?.map((item: UserTypes) => (
        <div className={styles.userItem}>
          <span>{item.name}</span>
          <span>{item.surname}</span>
          <span>{item.age}</span>
          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => deleteUser(item.id)}>Remove</button>
        </div>
      ))}
      {editModalIsOpen && selectedUser && (
        <EditModal
          getUsers={getUsers}
          selectedUser={selectedUser}
          setEditModalIsOpen={setEditModalIsOpen}
        />
      )}
    </div>
  );
}
