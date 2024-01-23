import React from "react";
import { Link } from "react-router-dom";
import cls from './NotFound.module.css'
import Layout from "../layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className={cls.container}>
      <h1>PAGE NOT FOUND</h1>
      <Link to="/">Go to Home page</Link>
      </div>
    </Layout>
  );
};

export default NotFound;
