'use client';
import React, { useState } from "react";
import cls from "./Product.module.css";
import AddProduct from "./AddProduct";
import MyProducts from "./MyProducts";
import Layout from "../components/layout/Layout";
import BlueButton from "../components/custom/buttons/blue-button/BlueButton";
import GreenButton from "../components/custom/buttons/green-button/GreenButton";
import RedButton from "../components/custom/buttons/red-button/RedButton";

const Product = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabNumber :  any) => {
    setActiveTab(tabNumber);
  };

  return (
    <Layout>
      <div>
        <div className="header">
          <p>Product</p>
          {/* <ButtonGroup activeTab={activeTab} /> */}
        </div>
        <div className={cls.midLeft}>
          <button
            className={`${cls.tab} ${activeTab === 1 ? cls.active : ""}`}
            onClick={() => handleTabChange(1)}
          >
            Add Product
          </button>
          <button
            className={`${cls.tab} ${activeTab === 2 ? cls.active : ""}`}
            onClick={() => handleTabChange(2)}
          >
            My Products
          </button>
        </div>
      </div>
      {activeTab === 1 && <AddProduct />}
      {activeTab === 2 && <MyProducts />}
    </Layout>
  );
};



export default Product;
