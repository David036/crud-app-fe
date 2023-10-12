import { useEffect, useState } from "react";
import styles from "./userAccount.module.scss";
import { getCurrentUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function UserAccount() {
  const [userEmail, setUserEmail] = useState<string>("");

  const navigate = useNavigate();

  const currentUserInfo = async () => {
    const currentUser = await getCurrentUser();
    setUserEmail(currentUser?.data.data.email);
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  useEffect(() => {
    currentUserInfo();
  }, []);

  return (
    <div className={styles.container}>
      <p>Email : {userEmail}</p>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
}
