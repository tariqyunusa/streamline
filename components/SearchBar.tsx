import React from "react";
import styles from '../styles/SearchBar.module.css'

interface SearchBarProps {
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    onSearchChange(searchValue);
    // console.log(searchValue);
  };

  return (
    <div className="searchbar_wrapper">
      <input
        type="search"
        name="search"
        id={styles.search}
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
