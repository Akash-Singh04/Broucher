import cls from "./NeedHelp.module.css";
import React from "react";

const NeedHelp = () => {
  return (
    <button className={cls.Btn}>
      <div className={cls.sign}>?</div>
      <div className={cls.text}>Help</div>
    </button>
  );
};

export default NeedHelp;
