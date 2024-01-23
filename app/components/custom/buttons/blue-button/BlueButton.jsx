import React from "react";
import cls from "./BlueButton.module.css";

export default function BlueButton({ text, action, children }) {
  return (
    <button className={cls.buttonBlue} onClick={action}>
      {text}
      {children}
    </button>
  );
}
