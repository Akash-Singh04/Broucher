import React, { useState } from "react";
import cls from "./Product.module.css";
import AddProduct from "./AddProduct";
import MyProducts from "./MyProducts";
import Layout from "../../components/layout/Layout";
import BlueButton from "../../components/custom/buttons/blue-button/BlueButton";
import GreenButton from "../../components/custom/buttons/green-button/GreenButton";
import RedButton from "../../components/custom/buttons/red-button/RedButton";
import { useDispatch, useSelector } from "react-redux";
import { handleBtnClick } from "../../redux/reducers/product-reducer";

const Product = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <Layout>
      <div>
        <div className="header">
          <p>Product</p>
          <ButtonGroup />
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

function ButtonGroup() {
  const { products, activeTab } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const checkedProductsCount = products
    ? products.filter((product) => product?.isChecked).length
    : 0;

  return (
    <div className="buttonGroup">
      {checkedProductsCount === 1 && (
        <BlueButton text="Edit" action={() => dispatch(handleBtnClick("edit"))}>
          <svg viewBox="0 0 512 512" style={{ width: 14 }}>
            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
          </svg>
        </BlueButton>
      )}
      {checkedProductsCount >= 1 &&
        (activeTab === "Active" ? (
          <RedButton
            text="Disable"
            action={() => dispatch(handleBtnClick("change-status"))}
          />
        ) : (
          <GreenButton
            text="Enable"
            action={() => dispatch(handleBtnClick("change-status"))}
          />
        ))}
    </div>
  );
}

export default Product;
