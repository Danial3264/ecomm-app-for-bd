import React from 'react';

const UpdateOrder = ({
  formData,
  handleInputChange,
  handleItemChange,
  handleSubmit,
  addItem,
  removeItem,
}) => {
  return (
    <form onSubmit={handleSubmit} className="mt-4 p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Edit Order</h3>

      {/* Customer Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Customer Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label htmlFor="phone_number" className="block text-gray-700 font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Total Amount */}
      <div className="mb-4">
        <label htmlFor="total_amount" className="block text-gray-700 font-medium mb-1">Total Amount</label>
        <input
          type="number"
          id="total_amount"
          name="total_amount"
          value={formData.total_amount}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Payment Status */}
      <div className="mb-4">
        <label htmlFor="payment_status" className="block text-gray-700 font-medium mb-1">Payment Status</label>
        <select
          id="payment_status"
          name="payment_status"
          value={formData.payment_status}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Items Section */}
      <h4 className="text-lg font-semibold mb-4">Items</h4>
      {formData.items.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center space-x-4 mb-2">
            <input
              type="text"
              name="product_name"
              value={item.product_name}
              onChange={(e) => handleItemChange(e, index)}
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Name"
              required
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(e, index)}
              className="w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Quantity"
              min="1"
              required
            />
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <div className="mb-4">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Update Order
        </button>
      </div>
    </form>
  );
};

export default UpdateOrder;
