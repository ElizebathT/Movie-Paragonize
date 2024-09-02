// src/SearchBar.js
import React, { useState } from 'react';
import { searchMovies } from './api';
import './styles.css'; // Import your CSS file for styling


const SearchBar = ({ onSearchResults }) => {
    const [query, setQuery] = useState('');
  
    const handleInputChange = (e) => {
      setQuery(e.target.value);
    };
  
    const handleSearch = async (e) => {
      e.preventDefault();
      const results = await searchMovies(query);
      onSearchResults(results);
    };
  
    return (
      <div className="searchbar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for movies..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    );
  };

export default SearchBar;
