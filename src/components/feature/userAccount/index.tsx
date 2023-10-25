import styles from "./userAccount.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function UserAccount() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleLogOut}>Log out</Button>
    </div>
  );
}
