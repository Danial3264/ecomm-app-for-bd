import axios from 'axios';
import React, { useState } from 'react';

const CreateCategory = ({ onCategoryCreated }) => {  // Receive the prop
  const [formData, setFormdata] = useState({
    category_name: '',
    category_shippingCost: ''
  });
  const [file, setFile] = useState(null); // Separate state for the file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the file in separate state
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for file upload
    const data = new FormData();
    data.append('category_name', formData.category_name);
    data.append('category_shippingCost', formData.category_shippingCost);
    data.append('image', file); // Add the file to FormData

    axios.post('/create-category', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('Category created successfully:', response.data);

        // Call the onCategoryCreated function to update the menu
        if (onCategoryCreated) {
          onCategoryCreated();  // Call the function to switch to 'viewCategory'
        }
      })
      .catch(error => {
        console.error('There was an error creating the category:', error);
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block text-gray-700">Category Name</label>
          <input
            type="text"
            name="category_name"
            value={formData.category_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Category name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Shipping Cost</label>
          <input
            type="text"
            name="category_shippingCost"
            value={formData.category_shippingCost}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Shipping Cost"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700">Category Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
