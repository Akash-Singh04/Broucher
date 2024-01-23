import React from "react";
import cls from "./Leftbar.module.css";

const Leftbar = () => {

  return (
    <div className={cls.container}>
      <div className={cls.listContainer}>
        <a href="/product">
          <img src="/products.png" className={cls.icon} alt=""/>
          Products
        </a>
        <a href="/help-desk">
        <img src="/help.png" className={cls.icon} alt=""/>
          Help desk
        </a>
        <a href="/chatbot" >
        <img src="/bot.png" className={cls.icon} alt=""/>
          Chatbot
        </a>
      </div>
    </div>
  );
};

export default Leftbar;
