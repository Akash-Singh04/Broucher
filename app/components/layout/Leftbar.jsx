import React from "react";
import cls from "./Leftbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { IoMdHelp } from "react-icons/io";
import { CgCalculator } from "react-icons/cg";
import { AiOutlineSend } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";
import { CgBulb } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/seller-action";
import { clearSuccessMsg } from "../../redux/reducers/seller-reducer";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

const Leftbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearSuccessMsg());
    signOut(auth);
    navigate("/");
  };

  // assigning location variable
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <div className={cls.container}>
      <div className={cls.listContainer}>
        <Link
          className={activePath === "/product" ? cls.active : ""}
          to="/product"
        >
          <CgNotes className={cls.icon} />
          Products
        </Link>
        <Link
          className={activePath === "/orders" ? cls.active : ""}
          to="/orders"
        >
          <CgNotes className={cls.icon} style={{ color: "#0790ad" }} />
          Orders
        </Link>
        <Link
          className={activePath === "/calculator" ? cls.active : ""}
          to="/calculator"
        >
          <CgCalculator className={cls.icon} style={{ color: "#0790ad" }} />
          Calculator
        </Link>
        <Link 
        className={activePath === '/wallet' ? cls.active : ''}
        to="/wallet"
      >
        <FaWallet className={cls.icon} />
        Wallet
      </Link>
        <Link
          className={activePath === "/remittance" ? cls.active : ""}
          to="/remittance"
        >
          <AiOutlineSend className={cls.icon} />
          Remittance
        </Link>
        <Link
          className={activePath === "/help-desk" ? cls.active : ""}
          to="/help-desk"
        >
          <IoMdHelp className={cls.icon} />
          Help desk
        </Link>
        <Link
          className={activePath === "/faq" ? cls.active : ""}
          to="/faq"
        >
          <CgBulb className={cls.icon} />
          FAQ
        </Link>
        
        {/* <Link
          className={activePath === "/notification" ? cls.active : ""}
          to="/notification"
        >
          <IoMdNotificationsOutline
            className={cls.icon}
            style={{ color: "red" }}
          />
          Notification
        </Link> */}
        {/* <Link className={activePath === "/faq" ? cls.active : ""} to="/faq">
          <FcFaq className={cls.icon} />
          FAQ
        </Link> */}
        <Link
          className={activePath === "/profile" ? cls.active : ""}
          to="/profile"
        >
          <CgProfile className={cls.icon} />
          Profile
        </Link>
        <div className={cls.logoutDiv} onClick={handleLogout}>
          <IoLogOutOutline className={cls.icon} style={{ color: "red" }} />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
