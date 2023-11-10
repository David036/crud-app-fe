import { useEffect, useState } from "react";
import UserInputs from "../userInputs";
import UsersTable from "../usersTable";
import { createUser, getAllUsers } from "../../../services/userService";
import openNotification from "../../shared/notification";
import { NotificationTypes } from "../../shared/notification/types";

import styles from "./users.module.scss";

export default function Users() {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [countOfPage, setCountOfPage] = useState<number>(0);

  const getUsers = async (): Promise<void> => {
    const res = await getAllUsers(limit, limit * (currentPage - 1));
    if (res?.success) {
      setUsers(res.data);
      setCountOfPage(res.count);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleCreate = async () => {
    const createdUser = await createUser(name, surname, age);
    if (createdUser?.data.success) {
      openNotification({
        type: NotificationTypes.SUCCESS,
        message: `User "${createdUser.data.data.name} ${createdUser.data.data.surname}" was successfully created`,
        description: "",
      });
      await getUsers();
    }
  };

  return (
    <div className={styles.container}>
      <UserInputs
        handleCreate={handleCreate}
        setName={setName}
        setSurname={setSurname}
        setAge={setAge}
      />
      <UsersTable
        setCountOfPage={setCountOfPage}
        countOfPage={countOfPage}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setLimit={setLimit}
        setUsers={setUsers}
        getUsers={getUsers}
        users={users}
      />
    </div>
  );
}
