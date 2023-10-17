import { removeUser, searchUsers } from "../../../services/userService";
import Table from "../../shared/table";
import EditModal from "../editModal";
import { UserTableProps, UserTypes } from "./types";
import styles from "./usersTable.module.scss";
import { useEffect, useState } from "react";
import editIcon from "../../../public/icons/edit.svg";
import removeIcon from "../../../public/icons/remove.svg";

import { Button } from "antd";
import Search from "antd/es/input/Search";

export default function UsersTable({
  users,
  getUsers,
  setUsers,
}: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<UserTypes | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [editModalIsVisible, setEditModalIsVisible] = useState<boolean>(false);
  const deleteUser = async (id: string) => {
    await removeUser(id);
    getUsers();
  };

  const handleEdit = (item: UserTypes) => {
    setSelectedUser(item);
    setEditModalIsVisible(true);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: (item: any) => (
        <div className={styles.btnsContainer}>
          <Button className={styles.actionBtn} onClick={() => handleEdit(item)}>
            <img width={20} height={20} alt="edit icon" src={editIcon} />
          </Button>
          <Button
            className={styles.actionBtn}
            onClick={() => deleteUser(item.id)}
          >
            <img width={20} height={20} alt="remove icon" src={removeIcon} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.usersTable}>
      <Search
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />
      {selectedUser && (
        <EditModal
          editModalIsVisible={editModalIsVisible}
          onClose={() => {
            setEditModalIsVisible(false);
          }}
          getUsers={getUsers}
          selectedUser={selectedUser}
        />
      )}
      <Table data={users} columns={columns} />
    </div>
  );
}
