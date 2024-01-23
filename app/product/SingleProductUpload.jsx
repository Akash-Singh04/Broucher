import React, { useState, useRef } from "react";
import { addHyphensAndLowercase, convertToTitleCase } from "../lib/utils";
import cls from "./SingleProductUpload.module.css";
import { subcategories } from "../lib/product-subcategories";
import {db} from "../firebase/firebaseconfig"
const fieldNames = [
  "title",
  "category",
  "subcategory",
  "img",
  "mrp",
  "description",
];

const acceptedTextFields = [
  "title",
  "category",
  "subcategory",
  "description",
];

const acceptedNumberFields = ["mrp"];

const SingleProductUpload = ({ closeModal }) => {
  const categories = Object.keys(subcategories);

  const imgInput = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    img: [],
    mrp: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      // Handling file input
      const files = Array.from(e.target.files).slice(0, 5); // Limit to max 5 files
      setFormData((prevData) => ({
        ...prevData,
        [name]: files,
      }));
    } else {
      // Handling other input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isFormDataValid = true;
    for (const field in formData) {
      const value = formData[field];

      if (acceptedNumberFields.includes(field) && isNaN(value)) {
        // Check if fields that should contain numbers are not valid numbers
        isFormDataValid = false;
        break;
      }

      if (acceptedTextFields.includes(field) && typeof value !== "string") {
        // Check if fields that should contain text are not valid strings
        isFormDataValid = false;
        break;
      }
    }

    if (isFormDataValid) {
      closeModal(); // Close the modal after successful submission
    } else {
      alert("Please enter valid values");
    }
  };

  const handleFileDelete = (index) => {
    const updatedFiles = formData.img.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      img: updatedFiles,
    }));
  };

  const handleBtnClick = (e) => {
    e.preventDefault();
    imgInput.current.click();
  };

  const generateLabel = (field) => {
    switch (field) {
      case "img":
        return "Upload Images (Max 5)";
      case "mrp":
        return "Maximum Retail Price";
      default:
        return convertToTitleCase(field);
    }
  };

  return (
    <form className={cls.form}>
      <div className={cls.wrapper}>
        {fieldNames.map((field) => (
          <div
            key={field}
            className={`${field === "img" ? cls.imgDiv : cls.inputDiv}`}
          >
            <div className={cls.imgDivHeader}>
              <label htmlFor={field}>
                {generateLabel(field)}
                {field === "description" && " (Optional)"}
              </label>
              {field === "img" && (
                <button
                  className={`button-primary ${cls.imgButton}`}
                  onClick={handleBtnClick}
                >
                  Select
                </button>
              )}
            </div>

            {field === "category" ? (
              <select
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            ) : field === "img" ? (
              <div>
                <input
                  type="file"
                  id={field}
                  name={field}
                  accept="image/*"
                  multiple
                  ref={imgInput}
                  className={cls.imgInput}
                  onChange={handleChange}
                  required
                />

                {formData.img.length > 0 && (
                  <div className={cls.uploadedPictures}>
                    {formData.img.map((file, index) => (
                      <div key={index} className={cls.uploadedPicture}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Uploaded ${index + 1}`}
                        />
                        <button
                          type="button"
                          className={cls.deleteButton}
                          onClick={() => handleFileDelete(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : field === "subcategory" ? (
              <select
                id={field}
                name={field}
                value={addHyphensAndLowercase(formData[field])}
                onChange={handleChange}
                required
              >
                <option value="">Select subcategory</option>
                {formData.category &&
                  subcategories[formData.category].map((cat) => {
                    return (
                      <option key={cat} value={addHyphensAndLowercase(cat)}>
                        {cat}
                      </option>
                    );
                  })}
              </select>
            ) : field === "description" ? (
              <textarea
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
                id={field}
                name={field}
                pattern={
                  acceptedNumberFields.includes(field) ? "[0-9]+" : undefined
                }
                value={formData[field]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
      </div>
      <div className={`buttonGroup ${cls.buttonDiv}`}>
        <button className="button-secondary" onClick={closeModal}>
          Cancel
        </button>
        <button type="submit" className="button-primary" onClick={handleSubmit}>
          Upload
        </button>
      </div>
    </form>
  );
};

export default SingleProductUpload;
