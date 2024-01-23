import React, { useState } from "react";
import { addHyphensAndLowercase, convertToTitleCase } from "../lib/utils";
import cls from "./SingleProductUpload.module.css";
import { subcategories } from "../lib/product-subcategories";
import { db } from "../firebase/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import {v4} from "uuid"

const fieldNames = [
  "title",
  "category",
  "subcategory",
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
  const userid="12345" //replace with auth
  const [formData, setFormData] = useState({
    userid: userid,
    title: "",
    category: "",
    subcategory: "",
    mrp: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handling other input fields
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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
      // Upload form data to Firebase
      await setDoc(doc(db, "products" , v4()), {
        formData,
      });
      console.log("Document written with ID: " + v4());

      // closeModal(); // Close the modal after successful submission
    } else {
      alert("Please enter valid values");
    }
  };

  const generateLabel = (field) => {
    switch (field) {
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
            className={`${cls.inputDiv}`}
          >
            <div className={cls.imgDivHeader}>
              <label htmlFor={field}>
                {generateLabel(field)}
                {field === "description" && " (Optional)"}
              </label>
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
                  subcategories[formData.category].map((cat) => (
                    <option key={cat} value={addHyphensAndLowercase(cat)}>
                      {cat}
                    </option>
                  ))}
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
