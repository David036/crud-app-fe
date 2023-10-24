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
  setCurrentPage,
  setLimit,
  limit,
  currentPage,
  countOfPage,
  setCountOfPage,
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

  const handleSearch = async () => {
    const searchedUsers = await searchUsers(searchValue, limit, currentPage);

    if (searchedUsers?.data) {
      setUsers(searchedUsers.data);
      setCountOfPage(searchedUsers.count);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [limit, currentPage]);

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
        allowClear={false}
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
            setSelectedUser(null);
          }}
          getUsers={getUsers}
          selectedUser={selectedUser}
        />
      )}
      {selectedUser && (
        <DeleteModal
          setCurrentPage={setCurrentPage}
          deleteModalIsVisible={deleteModalIsVisible}
          onClose={() => {
            setDeleteModalIsVisible(false);
          }}
          selectedUser={selectedUser}
          getUsers={getUsers}
        />
      )}
      <Table
        countOfPage={countOfPage}
        setCurrentPage={setCurrentPage}
        setLimit={setLimit}
        data={users}
        columns={columns}
      />
    </div>
  );
}
