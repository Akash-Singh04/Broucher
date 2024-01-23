import React from "react";
import cls from "./Header.module.css";
import Link from "next/link";
const Header = () => {

  return (
    <div className={cls.container}>
      <div className={cls.left}>
      <Link href="/">
          <p>   </p>
          <h3>Broucher</h3>
        </Link>
      </div>
      <div className={cls.right}>
      <p>Hack-O-Rama</p>
      </div>
    </div>
  );
};

export default Header;
