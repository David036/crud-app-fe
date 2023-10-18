import { useEffect, useState } from "react";
import { Button } from "antd";
import Search from "antd/es/input/Search";
import EditModal from "../editModal";
import DeleteModal from "../deleteModal";
import Table from "../../shared/table";
import { searchUsers } from "../../../services/userService";
import editIcon from "../../../public/icons/edit.svg";
import removeIcon from "../../../public/icons/remove.svg";
import { UserTableProps, UserTypes } from "./types";

import styles from "./usersTable.module.scss";

export default function UsersTable({
  users,
  getUsers,
  setUsers,
}: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<UserTypes | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [editModalIsVisible, setEditModalIsVisible] = useState<boolean>(false);
  const [deleteModalIsVisible, setDeleteModalIsVisible] =
    useState<boolean>(false);

  const handleEdit = (item: UserTypes) => {
    setSelectedUser(item);
    setEditModalIsVisible(true);
  };

  const handleDelete = (item: UserTypes) => {
    setSelectedUser(item);
    setDeleteModalIsVisible(true);
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
            onClick={() => handleDelete(item)}
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
          key={selectedUser.id}
          editModalIsVisible={editModalIsVisible}
          onClose={() => {
            setEditModalIsVisible(false);
          }}
          getUsers={getUsers}
          selectedUser={selectedUser}
        />
      )}
      {selectedUser && (
        <DeleteModal
          deleteModalIsVisible={deleteModalIsVisible}
          onClose={() => {
            setDeleteModalIsVisible(false);
          }}
          selectedUser={selectedUser}
          getUsers={getUsers}
        />
      )}
      <Table data={users} columns={columns} />
    </div>
  );
}
