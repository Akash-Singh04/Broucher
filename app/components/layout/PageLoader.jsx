import React from "react";
import cls from "./PageLoader.module.css";

const PageLoader = () => {
  return (
    <div className={cls.container}>
      <div className={cls.loading}></div>
    </div>
  );
};

export default PageLoader;
