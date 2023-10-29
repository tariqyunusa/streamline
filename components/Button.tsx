import { CustomButtonProp } from "@/types";
import "../styles/Button.css";
import React from "react";

const Button = ({ title, handleClick }: CustomButtonProp) => {
  return (
    <button
      disabled={false}
      type={"button"}
      className={`custom-btn  btn-search`}
      onClick={handleClick}
    >
      <span className="span_btn">{title}</span>
    </button>
  );
};

export default Button;
