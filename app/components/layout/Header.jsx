import React from "react";
import cls from "./Header.module.css";

const Header = () => {

  return (
    <div className={cls.container}>
      <div className={cls.left}>
      </div>
      <div className={cls.right}>
      <p>Hello!</p>
      </div>
    </div>
  );
};

export default Header;
