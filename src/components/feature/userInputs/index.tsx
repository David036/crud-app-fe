import { Button, Input } from "antd";
import { UserInputsProps } from "./types";
import styles from "./userInputs.module.scss";

export default function UserInputs({
  handleCreate,
  setName,
  setSurname,
  setAge,
}: UserInputsProps) {
  return (
    <div className={styles.inputsContainer}>
      <div className={styles.inputSection}>
        <span>Name</span>
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
        />
      </div>
      <div className={styles.inputSection}>
        <span>Surname</span>
        <Input
          onChange={(e) => {
            setSurname(e.target.value);
          }}
          type="text"
        />
      </div>
      <div className={styles.inputSection}>
        <span>Age</span>
        <Input
          onChange={(e) => {
            setAge(e.target.value);
          }}
          type="number"
        />
      </div>
      <Button onClick={handleCreate}>Create User</Button>
    </div>
  );
}
