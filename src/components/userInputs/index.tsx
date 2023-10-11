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
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
        />
      </div>
      <div className={styles.inputSection}>
        <span>Surname</span>
        <input
          onChange={(e) => {
            setSurname(e.target.value);
          }}
          type="text"
        />
      </div>
      <div className={styles.inputSection}>
        <span>Age</span>
        <input
          onChange={(e) => {
            setAge(e.target.value);
          }}
          type="number"
        />
      </div>
      <button onClick={handleCreate}>Create User</button>
    </div>
  );
}
