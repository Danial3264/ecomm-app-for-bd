import React, { useState } from 'react';

const Search = ({onQuery}) => {
  const [query, setQuery] = useState('');
  

  const handleQuery = (e)=>{
    setQuery(e.target.value)
    onQuery(e.target.value)
  }

  
  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleQuery}
        placeholder='search your content...'
        className="w-full p-3 rounded bg-gray-300 text-white placeholder-gray-400"
      />
    </div>
  );
};

export default Search;
