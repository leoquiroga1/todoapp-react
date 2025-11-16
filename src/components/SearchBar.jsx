import React from "react";

const SearchBar = ({ onSearch, onFilter }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default SearchBar;
