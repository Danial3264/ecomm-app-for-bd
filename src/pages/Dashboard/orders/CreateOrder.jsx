import React, { useState } from 'react';
import axios from 'axios';

const CreateOrder = ({ onOrderCreated }) => {
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    price: '',
    customerName: '',
    customerEmail: '',
    customerAddress: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('/create-order', formData)
    .then(response => {
      alert('Order Created Successfully!');
      onOrderCreated();  
    })
    .catch(error => {
      console.error('There was an error creating the order:', error);
    });
   
    setFormData({
      productName: '',
      quantity: '',
      price: '',
      customerName: '',
      customerEmail: '',
      customerAddress: ''
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Order</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter quantity"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Customer Name */}
        <div>
          <label className="block text-gray-700">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter customer name"
            required
          />
        </div>

        {/* Customer Email */}
        <div>
          <label className="block text-gray-700">Customer Email</label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter customer email"
            required
          />
        </div>

        {/* Customer Address */}
        <div>
          <label className="block text-gray-700">Customer Address</label>
          <textarea
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter customer address"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
