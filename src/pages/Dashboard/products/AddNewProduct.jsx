import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddNewProduct = ({ onProductCreated }) => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_price: '',
    offer_price: '',
    product_description: '',
    category_id: '',
    size: '',
    image: null,
  });

  const [categories, setCategories] = useState([]); 

  // Fetch categories when the component mounts
  useEffect(() => {
    axios.get('/categories') // Adjust API endpoint based on your backend route
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category_id: e.target.value, // Update category_id in formData
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formAllData = new FormData();
    formAllData.append('product_name', formData.product_name);
    formAllData.append('product_price', formData.product_price);
    formAllData.append('offer_price', formData.offer_price);
    formAllData.append('product_description', formData.product_description);
    formAllData.append('category_id', formData.category_id);
    formAllData.append('size', formData.size);
    formAllData.append('image', formData.image);


    console.log(formData)

    // Make the API request to the server
    axios
      .post('/create-product', formAllData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert('Product Created Successfully!');
        onProductCreated();
      })
      .catch((error) => {
        console.error('There was an error creating the product:', error);
      });

    // Reset form data after submission
    setFormData({
      product_name: '',
      product_price: '',
      offer_price: '',
      product_description: '',
      category_id: '',
      size: '',
      image: null,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-gray-700">Product Price</label>
          <input
            type="number"
            name="product_price"
            value={formData.product_price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product price"
            required
          />
        </div>

        {/* Offer Price */}
        <div>
          <label className="block text-gray-700">Offer Price</label>
          <input
            type="number"
            name="offer_price"
            value={formData.offer_price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter offer price"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-gray-700">Product Description</label>
          <input
            type="text"
            name="product_description"
            value={formData.product_description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product description"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Have Size?</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Size</option>
            
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-gray-700">Product Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
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
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
