import React, { useState, useEffect } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import cls from "./MyProducts.module.css";
import Loader from "../components/layout/Loader";
import { db } from "../firebase/firebaseconfig"; // Import your Firebase configuration

const MyProducts = () => {
  const userid="12345" //replace with auth
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Active");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const docRef = collection(db, "products"); // Replace sellerid with your seller ID
        // const docRef = doc(db, "products"); // Replace sellerid with your seller ID
        const docSnap = await getDocs(docRef);
        const productsData = docSnap.docs.map((doc) => doc.data());
        console.log(productsData);
        const myProductData = productsData.filter(
          (product) => product.formData.userid === userid
        );
        setProducts(myProductData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <>
      {!loading ? (
        <div className={`container`} id="ProductsContainer">
          <ProductsTable activeTab={activeTab} products={products} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
const ProductsTable = ({ activeTab, products }) => {
  return products?.length !== 0 ? (
    <table className={cls.table}>
      <TableHead />
      <TableBody products={products} />
    </table>
  ) : (
    <p className="noResults">No products found</p>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr>
        <td>Title</td>
        <td>Category</td>
        <td>Subcategory</td>
        <td>MRP</td>
      </tr>
    </thead>
  );
};

const TableBody = ({ products }) => {
  return (
    <tbody>
      {products &&
        products.map((product) => {
          return <ProductTableRow product={product} key={product.productID} />;
        })}
    </tbody>
  );
};

const ProductTableRow = ({ product }) => {
  return (
    <tr>
      <td>{product.formData?.title}</td>
      <td>{product.formData?.category}</td>
      <td>{product.formData?.subcategory}</td>
      <td>₹ {product.formData?.mrp}</td>
    </tr>
  );
};



function EditModalContent() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Initial form data...
  });

  const imgInput = useRef(null);

  // Implement handleChange, handleSubmit, handleBtnClick, handleFileDelete functions...

  return (
    <form onSubmit={handleSubmit} className={cls.editProductForm}>
      {/* Form fields... */}
      <div className={cls.confirmationButtons}>
        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? "Updating..." : "Save changes"}
        </button>
        <button
          className="button-secondary"
          onClick={() => setModalIsOpen(false)}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ConfirmationButtons() {
  return (
    <div className="buttonGroup">
      <button
        className="button-secondary"
        onClick={() => setModalIsOpen(false)}
      >
        Cancel
      </button>
      <button
        className="button-primary"
        onClick={() => handleProductStatusChange()} // Implement this function
      >
        Confirm
      </button>
    </div>
  );
}

function ProductDetailsContent() {
  // Implement ProductDetailsContent logic...
}

export default MyProducts;
