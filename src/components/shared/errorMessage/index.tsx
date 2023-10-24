import { ErrorMessageProps } from "./types";

import styles from "./errorMessage.module.scss";

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <>{message && <p className={styles.errorMessage}>{message}</p>} </>;
};
