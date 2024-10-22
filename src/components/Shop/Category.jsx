// Category.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);   
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);   
  
  const location = useLocation();

  useEffect(() => {
    axios.get('/categories')
      .then(response => {
        setCategories(response.data);    
        setLoading(false);   
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');  
        setLoading(false);
      });
  }, []);  

  if (loading) {
    return <div>Loading...</div>;   
  }

  if (error) {
    return <div>{error}</div>;   
  }

  // URL থেকে অ্যাক্টিভ ক্যাটাগরি আইডি বের করা
  const params = new URLSearchParams(location.search);
  const activeCategory = params.get('category');

  return (
    <div className="min-h-screen w-full p-4">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        <Link
          to="/shop"
          key="all"
          className={`flex flex-col cursor-pointer p-4 rounded font-bold text-lg 
            ${!activeCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          All Products
        </Link>
        {categories.map((category) => (
          <Link 
            to={`/shop?category=${category.id}`}
            key={category.id} 
            className={`flex flex-col cursor-pointer p-4 rounded font-bold text-lg 
              ${activeCategory === String(category.id) ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {category.category_name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Category;
