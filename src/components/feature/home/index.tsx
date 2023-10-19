import { useContext, useEffect, useState } from "react";
import styles from "./home.module.scss";
import UsersTable from "../usersTable";
import { createUser, getAllUsers } from "../../../services/userService";
import UserInputs from "../userInputs";
import { AuthContext } from "../../../context/auth/context";
import UserAccount from "../userAccount";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [users, setUsers] = useState([]);
  const [age, setAge] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [countOfPage, setCountOfPage] = useState<number>(0);

  const { isAuth } = useContext(AuthContext);

  const getUsers = async (): Promise<void> => {
    const res = await getAllUsers(limit, limit * (currentPage - 1));
    if (res?.success) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, [limit, currentPage]);

  const handleCreate = async () => {
    await createUser(name, surname, age);
    await getUsers();
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
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setLimit={setLimit}
        setUsers={setUsers}
        getUsers={getUsers}
        users={users}
      />
      {isAuth && <UserAccount />}
    </div>
  );
}
