import React from "react";
import cls from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../bolesale-logo.png";
import { useSelector } from "react-redux";

const Header = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className={cls.container}>
      <div className={cls.left}>
        <Link to="/orders">
          <img src={logo} alt="" />
          <h3>Bolesale Seller Panel</h3>
        </Link>
      </div>
      <div className={cls.right}>
        <p>Hello {seller.name} !</p>
      </div>
    </div>
  );
};

export default Header;
