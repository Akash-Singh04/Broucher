import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import cls from "./SearchBar.module.css";


export default function SearchBar({ handleSearch, searchQuery }) {
    return (
      <div className={cls.searchContainer}>
        <AiOutlineSearch className={cls.searchIcon} />
        <input
          type="text"
          placeholder="Search by product name"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchQuery}
        />
      </div>
    );
  }