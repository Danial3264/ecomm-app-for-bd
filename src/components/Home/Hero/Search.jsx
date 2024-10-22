import React, { useState, useEffect } from 'react';

const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);  // Trigger the search in the parent component (Navbar)
  };

  return (
    <>
      <input 
        className='rounded text-black p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' 
        type="text" 
        placeholder="Search..."
        value={searchText}
        onChange={handleInputChange}  // Call the input change handler
      />
    </>
  );
};

export default Search;
