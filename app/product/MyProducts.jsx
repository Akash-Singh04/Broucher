import React, { useState } from "react";
import cls from "./MyProducts.module.css";
import Loader from "../components/layout/Loader";
import Modal from "../components/custom/modal/Modal";
import {
  addCommas,
  addHyphensAndLowercase,
  convertStringToTitleOrUppercase,
  getCheckedItems,
  removeHyphensAndTitleCase,
} from "../lib/utils";
import { subcategories } from "../lib/product-subcategories"
import SearchBar from "../components/custom/SearchBar/SearchBar";

const MyProducts = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Active"); // Assuming default tab is "Active"
  const [sortOptions, setSortOptions] = useState({
    sortBy: "",
    sortOrder: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
  });

  // Add other state variables as needed...

  return (
    <>
      <div className={cls.filters_and_sorting_container}>
        {/* Filters Component */}
        <Filters
          categories={categories}
          filters={filters}
          handleCategoryChange={handleCategoryChange}
          handleSubcategoryChange={handleSubcategoryChange}
          handleSearch={handleSearch}
        />

        {/* Empty space */}
        <div className={cls.empty_space} />

        {/* SortingOptions Component */}
        <SortingOptions
          sortOptions={sortOptions}
          handleSortByChange={handleSortByChange}
          handleSortOrderChange={handleSortOrderChange}
        />
      </div>
      <div className={cls.positioning}>
        <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
      </div>
      {!loading ? (
        <div className={`container`} id="ProductsContainer">
          <TabGroup activeTab={activeTab} setActiveTab={setActiveTab} />
          <ProductsTable
            activeTab={activeTab}
            sortOptions={sortOptions}
            searchQuery={searchQuery}
            filters={filters}
          />
        </div>
      ) : (
        <Loader />
      )}
      <ProductsModal />
    </>
  );
};

function TabGroup({ activeTab, setActiveTab }) {
  return (
    <ul className={cls.tabContainer}>
      <li
        className={`${activeTab === "Active" ? cls.active : ""}`}
        onClick={() => setActiveTab("Active")}
      >
        Active
      </li>
      <li
        className={`${activeTab === "Disabled" ? cls.active : ""}`}
        onClick={() => setActiveTab("Disabled")}
      >
        Disabled
      </li>
    </ul>
  );
}

const SortingOptions = ({ sortOptions, handleSortByChange, handleSortOrderChange }) => {
  return (
    <div className={cls.sorting_options_container}>
      <label htmlFor="sortBy">Sort By:</label>
      <select
        id="sortBy"
        value={sortOptions.sortBy}
        onChange={(e) => handleSortByChange(e.target.value)}
      >
        <option value="">None</option>
        <option value="moq">Minimum Order Quantity</option>
        <option value="sp">Selling Price</option>
        {/* Add other sorting options as needed */}
      </select>
      <select
        id="sortOrder"
        value={sortOptions.sortOrder}
        onChange={(e) => handleSortOrderChange(e.target.value)}
      >
        <option value="">None</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

const Filters = ({ categories, filters, handleCategoryChange, handleSubcategoryChange, handleSearch }) => {
  return (
    <div className={cls.filters_container}>
      <label htmlFor="sortOrder">Filter By:</label>
      <select onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Subcategory filter */}
      <select onChange={(e) => handleSubcategoryChange(e.target.value)}>
        <option value="">All Subcategories</option>
        {filters.subcategoryOptions.map((subcategory) => (
          <option key={subcategory} value={subcategory}>
            {subcategory}
          </option>
        ))}
      </select>
    </div>
  );
};

function ProductsTable({ activeTab, sortOptions, searchQuery, filters }) {
  const filteredProducts = products.filter((product) => {
    return (
      (!filters.category || product.category === filters.category) &&
      (!filters.subcategory || product.subcategory === filters.subcategory) &&
      (!searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
  const sortedProducts = sortProductsBy(
    filteredProducts,
    sortOptions.sortBy,
    sortOptions.sortOrder
  );

  return products?.length !== 0 ? (
    <table className={cls.table}>
      <TableHead />
      <TableBody sortedProducts={sortedProducts} />
    </table>
  ) : (
    <p className="noResults">No products found</p>
  );
}

function TableHead() {
  return (
    <thead>
      <tr>
        <td>Title</td>
        <td>Category</td>
        <td>Subcategory</td>
        <td>SP</td>
        <td>MRP</td>
      </tr>
    </thead>
  );
}

function TableBody({ sortedProducts }) {
  return (
    <tbody>
      {sortedProducts &&
        sortedProducts.map((product) => {
          return <ProductTableRow product={product} key={product.productID} />;
        })}
    </tbody>
  );
}

function ProductTableRow({ product }) {
  return (
    <tr>
      <td>{product?.title}</td>
      <td>{product?.category}</td>
      <td>{removeHyphensAndTitleCase(product?.subcategory)}</td>
      <td>₹ {addCommas(product?.sp)}</td>
      <td>₹ {addCommas(product?.mrp)}</td>
    </tr>
  );
}

function ProductsModal() {
  const [modalAction, setModalAction] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const modalContent = {
    component: null,
    title: "",
  };

  switch (modalAction) {
    case "edit":
      modalContent.component = <EditModalContent />;
      modalContent.title = "Edit product";
      break;
    case "change-status":
      modalContent.component = <ConfirmationButtons />;
      modalContent.title = `Are you sure you want to ${
        activeTab === "Active" ? "disable" : "enable"
      } these product(s)?`;
      break;
    case "view-product-details":
      modalContent.component = <ProductDetailsContent />;
      modalContent.title = "Product Details";
      break;
    default:
      break;
  }

  return (
    <Modal
      title={modalContent.title}
      open={modalIsOpen}
      closeModal={() => setModalIsOpen(false)}
    >
      {modalContent.component}
    </Modal>
  );
}

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
