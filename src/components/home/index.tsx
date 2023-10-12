import { useContext, useState } from "react";
import styles from "./home.module.scss";
import UsersTable from "../usersTable";
import { createUser, getAllUsers } from "../../services/userService";
import UserInputs from "../userInputs";
import { AuthContext } from "../../context/auth/context";
import UserAccount from "../userAccount";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [users, setUsers] = useState([]);
  const [age, setAge] = useState<string>("");

  const { isAuth } = useContext(AuthContext);

  const getUsers = async (): Promise<void> => {
    const res = await getAllUsers();
    if (res?.success) {
      setUsers(res.data);
    }
  };

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
      <UsersTable setUsers={setUsers} getUsers={getUsers} users={users} />
      {isAuth && <UserAccount />}
    </div>
  );
}
