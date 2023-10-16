import { ErrorMessageProps } from "./types";

import styles from "./errorMessage.module.scss";

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <p className={styles.errorMessage}>{message}</p>;
};
