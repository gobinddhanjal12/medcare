"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ setFilters }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      name: query.trim() || undefined, // Remove name filter if empty
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
      <Search className={styles.icon} />
      <input
        type="text"
        placeholder="Search doctors by name..."
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
