import React from "react";
import "../styles/SearchBar.css";

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
    <div className="searchbar-wrapper">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
