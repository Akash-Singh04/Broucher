import React from "react"

import cls from './NotFound.module.css'
import Layout from "../layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className={cls.container}>
      <h1>PAGE NOT FOUND</h1>
      </div>
    </Layout>
  );
};

export default NotFound;
