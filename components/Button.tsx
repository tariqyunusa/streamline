import { CustomButtonProp } from "@/types";
import styles from "../styles/Button.module.css";
import React from "react";

const Button = ({ title, onClick }: CustomButtonProp) => {
  return (
    <button
      disabled={false}
      type={"button"}
      className={`${styles.custom_btn}  ${styles.btn_search}`}
      onClick={onClick}
    >
      <span className={styles.span_btn}>{title}</span>
    </button>
  );
};

export default Button;
