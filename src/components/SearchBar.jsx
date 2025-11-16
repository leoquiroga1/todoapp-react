import React from "react";

const SearchBar = ({ onSearch, onFilter }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar tareas..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="all">Todas</option>
        <option value="pending">Pendiente</option>
        <option value="in-progress">En Progreso</option>
        <option value="completed">Completada</option>
      </select>
    </div>
  );
};

export default SearchBar;
