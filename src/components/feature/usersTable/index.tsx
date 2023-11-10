import { useEffect, useState } from "react";
import { Button } from "antd";
import Search from "antd/es/input/Search";
import EditModal from "../editModal";
import DeleteModal from "../deleteModal";
import Table from "../../shared/table";
import {
  removeUser,
  searchUsers,
  updateUser,
} from "../../../services/userService";
import editIcon from "../../../public/icons/edit.svg";
import removeIcon from "../../../public/icons/remove.svg";
import { UserTableProps, UserTypes } from "./types";

import styles from "./usersTable.module.scss";
import openNotification from "../../shared/notification";
import { NotificationTypes } from "../../shared/notification/types";

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
  const [newName, setNewName] = useState(selectedUser?.name);
  const [newSurname, setNewSurname] = useState(selectedUser?.surname);
  const [newAge, setNewAge] = useState(`${selectedUser?.age}`);

  const editUser = async () => {
    if (selectedUser) {
      const editedUser = {
        id: selectedUser.id,
        name: newName ?? selectedUser.name,
        surname: newSurname ?? selectedUser.surname,
        age: parseInt(newAge),
      };

      if (editedUser) {
        await updateUser(editedUser);
        setEditModalIsVisible(false);
        setSelectedUser(null);
        getUsers();
      }
    }
  };

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

  let newValues;

  if (selectedUser) {
    newValues = [
      {
        value: selectedUser.name,
        changeValue: setNewName,
        type: "string",
      },
      {
        value: selectedUser.surname,
        changeValue: setNewSurname,
        type: "string",
      },
      {
        value: selectedUser.age,
        changeValue: setNewAge,
        type: "number",
      },
    ];
  }

  const deleteUser = async (id: string) => {
    const removedUser = await removeUser(id);

    if (removedUser?.data.success) {
      openNotification({
        type: NotificationTypes.SUCCESS,
        message: `User "${removedUser.data.data.name} ${removedUser.data.data.surname}" was successfully deleted`,
        description: "",
      });
      setDeleteModalIsVisible(false);
      setCurrentPage(1);
      getUsers();
    }
  };

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
          newValues={newValues}
          editFunction={editUser}
          key={selectedUser.id}
          editModalIsVisible={editModalIsVisible}
          onClose={() => {
            setEditModalIsVisible(false);
            setSelectedUser(null);
          }}
        />
      )}
      {selectedUser && (
        <DeleteModal
          selectedUserId={selectedUser.id}
          selectedUserTitle={selectedUser.name}
          deleteFunction={deleteUser}
          deleteModalIsVisible={deleteModalIsVisible}
          onClose={() => {
            setDeleteModalIsVisible(false);
          }}
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
