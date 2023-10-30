import styles from "./userAccount.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { logout } from "../../../services/authService";

export default function UserAccount() {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const response = await logout();
    if (response?.data.success) {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleLogOut}>Log out</Button>
    </div>
  );
}
