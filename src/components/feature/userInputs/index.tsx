import { Button, Input } from "antd";
import { ErrorTypes, UserInputsProps } from "./types";
import styles from "./userInputs.module.scss";
import { useMemo, useState } from "react";
import {
  ageValidation,
  nameValidation,
} from "../../../utils/functions/validation";
import { ErrorMessage } from "../../shared/errorMessage";

export default function UserInputs({
  handleCreate,
  setName,
  setSurname,
  setAge,
}: UserInputsProps) {
  const [ageError, setAgeError] = useState<ErrorTypes>({
    success: false,
    message: "",
  });
  const [nameError, setNameError] = useState<ErrorTypes>({
    success: false,
    message: "",
  });
  const [surnameError, setSurnameError] = useState<ErrorTypes>({
    success: false,
    message: "",
  });

  const preventEKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "e" ||
      event.key === "E" ||
      event.key === "-" ||
      event.key === "+"
    ) {
      event.preventDefault();
    }
  };

  const isCreateDisabled = useMemo((): boolean => {
    return !(nameError.success && surnameError.success && ageError.success);
  }, [ageError, nameError, surnameError]);

  const createUser = () => {
    if (!isCreateDisabled) {
      handleCreate();
    }
  };

  return (
    <div className={styles.inputsContainer}>
      <div className={styles.inputSection}>
        <span>Name</span>
        <Input
          onChange={(e) => {
            setName(e.target.value);
            nameValidation(e.target.value, setNameError, "Name");
          }}
          type="text"
        />
        <ErrorMessage message={nameError.message} />
      </div>
      <div className={styles.inputSection}>
        <span>Surname</span>
        <Input
          onChange={(e) => {
            setSurname(e.target.value);
            nameValidation(e.target.value, setSurnameError, "Surname");
          }}
          type="text"
        />
        <ErrorMessage message={surnameError.message} />
      </div>
      <div className={styles.inputSection}>
        <span>Age</span>
        <Input
          onChange={(e) => {
            setAge(e.target.value);
            ageValidation(e.target.value, setAgeError);
          }}
          type="number"
          onKeyPress={preventEKey}
        />
        <ErrorMessage message={ageError.message} />
      </div>
      <Button disabled={isCreateDisabled} onClick={createUser}>
        Create User
      </Button>
    </div>
  );
}
