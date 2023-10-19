import { CustomButtonProp } from "@/types";
import "../styles/Button.css";
import React from "react";

const Button = ({ title, containerStyle, handleClick }: CustomButtonProp) => {
  return (
    <button
      disabled={false}
      type={"button"}
      className={`custom-btn ${containerStyle}`}
      onClick={handleClick}
    >
      <span>{title}</span>
    </button>
  );
};

export default Button;
