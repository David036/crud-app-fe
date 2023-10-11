import { useEffect, useState } from "react";
import styles from "./home.module.scss";
import UsersTable from "../usersTable";
import { createUser, getAllUsers } from "../../services/userService";
import UserInputs from "../userInputs";
import SignupPage from "../signup";
import LoginPage from "../login";
import { getCurrentUser } from "../../services/authService";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [users, setUsers] = useState([]);
  const [age, setAge] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string>("");

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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      getCurrentUser();
    }
  }, []);

  return (
    <div className={styles.container}>
      <UserInputs
        handleCreate={handleCreate}
        setName={setName}
        setSurname={setSurname}
        setAge={setAge}
      />
      <UsersTable setUsers={setUsers} getUsers={getUsers} users={users} />
      {/* <SignupPage />
      <LoginPage /> */}
    </div>
  );
}
