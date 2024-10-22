import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateProduct = ({ formData, handleInputChange, handleSubmit }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    axios.get('/categories') // Replace with your actual API endpoint
      .then(response => {
        setCategories(response.data); // Assuming response data is an array of categories
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-200 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Edit Product</h3>
      
      {/* Product Name */}
      <div className="mb-2">
        <label className="block mb-1">Product Name</label>
        <input
          type="text"
          name="product_name"
          value={formData.product_name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Product Price */}
      <div className="mb-2">
        <label className="block mb-1">Product Price</label>
        <input
          type="number"
          name="product_price"
          value={formData.product_price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Offer Price */}
      <div className="mb-2">
        <label className="block mb-1">Offer Price</label>
        <input
          type="number"
          name="offer_price"
          value={formData.offer_price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Product Image */}
      <div className="mb-2">
        <label className="block mb-1">Upload Image</label>
        <input
          type="file"
          name="image"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Product Description */}
      <div className="mb-2">
        <label className="block mb-1">Product Description</label>
        <input
          type="text"
          name="product_description"
          value={formData.product_description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
          <label className="block text-gray-700">Have Size?</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Size</option>
            
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            
          </select>
        </div>

      {/* Category Dropdown */}
      <div className="mb-2">
        <label className="block mb-1">Category</label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Update Product
      </button>
    </form>
  );
};

export default UpdateProduct;
