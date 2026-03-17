import React from "react";
import { SpinnerDotted } from "spinners-react";
import styles from "./Spinner.module.css";

const Spinner: React.FC = () => (
  <div className={styles["spinner-overlay"]} style={{ background: "var(--gray-50)" }}>
    <SpinnerDotted
      size={120}
      thickness={120}
      speed={100}
      color="var(--blue-700)"
    />
  </div>
);

export default Spinner;
