import React from "react";
import cls from "./Leftbar.module.css";
import { IoLogOutOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { IoMdHelp } from "react-icons/io";
import { CgCalculator } from "react-icons/cg";
import { AiOutlineSend } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";
import { CgBulb } from "react-icons/cg";
const Leftbar = () => {

  return (
    <div className={cls.container}>
      <div className={cls.listContainer}>
        <a href="/product">
          <CgNotes className={cls.icon} />
          Products
        </a>
        <a href="/orders" >
          <CgNotes className={cls.icon} style={{ color: "#0790ad" }} />
          Orders
        </a>
        <a href="/calculator" >
          <CgCalculator className={cls.icon} style={{ color: "#0790ad" }} />
          Calculator
        </a>
        <a href="/wallet" >
          <FaWallet className={cls.icon} />
          Wallet
        </a>
        <a href="/remittance" >
          <AiOutlineSend className={cls.icon} />
          Remittance
        </a>
        <a href="/help-desk">
          <IoMdHelp className={cls.icon} />
          Help desk
        </a>
        <a href="/faq" >
          <CgBulb className={cls.icon} />
          FAQ
        </a>
        <a href="/profile" >
          <CgProfile className={cls.icon} />
          Profile
        </a>
        <div className={cls.logoutDiv}>
          <IoLogOutOutline className={cls.icon} style={{ color: "red" }} />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
