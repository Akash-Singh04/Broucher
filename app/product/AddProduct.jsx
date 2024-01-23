import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiFileText } from "react-icons/fi";
import cls from "./AddProduct.module.css";
import Modal from "../components/custom/modal/Modal";
import SingleProductUpload from "./SingleProductUpload";

const AddProduct = () => {
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow((prev) => !prev);
  };

  const handleClick = () => {
    setShow(true);
  };

  return (
    <div className={cls.container}>
      <div className={cls.modalHeader}>
        <h3>Create Product</h3>
      </div>
      <div className={cls.uploadForm}>
        <div className={cls.uploadFormLeft}>
          <FiFileText className={cls.excelIcon} />
        </div>
        <div className={cls.uploadFormRight}>
          <p>Create Product</p>
          <span>Fill up the form to create a single product</span>

          <button
            className={cls.uploadBtn}
            onClick={() => handleClick("single")}
          >
            <GoPlus className={cls.uploadIcon} /> CREATE PRODUCT
          </button>
        </div>
      </div>
      <Modal open={show} closeModal={toggleModal} title="Create Product">
        <SingleProductUpload toggleModal={toggleModal} />
      </Modal>
    </div>
  );
};

export default AddProduct;
