import Butterfly from "../../shared/animationModel";

import styles from "./logo.module.scss";

export default function Logo() {
  return (
    <div className={styles.container}>
      <Butterfly />
      <h1>
        <span>I</span>M<span>POSSIBLE</span>
      </h1>
    </div>
  );
}
