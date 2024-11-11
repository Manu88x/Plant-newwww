import React from "react";

function Search({ searchQuery, onSearch }) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchQuery}
        onChange={onSearch}
      />
    </div>
  );
}

export default Search;

