import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, deleteOrder, updateOrder } from '../../../redux/OrdersSlice';
import UpdateOrder from './UpdateOrder';
import axios from 'axios';

const PendingOrders = () => {
  const dispatch = useDispatch();
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const { orders, status, error } = useSelector((state) => state.orders);
  const pendingOrders = orders.filter(order => order.payment_status === 'Pending');

  const handleEdit = (order) => {
    setEditingOrder(order.orderId); // Using orderId from grouped orders
    setFormData({
      name: order.name,
      phone_number: order.phone_number,
      address: order.address,
      total_amount: order.total_amount,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      customer_id: order.customer_id,
      shipping_cost: order.shipping_cost,
      items: order.items.map(item => ({
        product_id: item.product_id,
        order_id: item.order_id,
        product_name: item.product_name,
        quantity: item.quantity,
        size: item.size,
      })),
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes for individual items
  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  // Remove an item from the order and delete it from the database
  const removeItem = async (index, order_id, product_id) => {
    try {
      await axios.delete(`/order-item/${order_id}/${product_id}`);
      const updatedItems = formData.items.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        items: updatedItems,
      });
      alert('Item removed successfully');
    } catch (error) {
      console.error('Failed to remove item:', error);
      alert('Failed to remove item from the order');
    }
  };

  // Handle form submission for updating the order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm('Are you sure you want to update this order?')) {
      dispatch(updateOrder({ id: editingOrder, updatedOrder: formData }));
      dispatch(fetchOrders());
      setEditingOrder(null);
    }
  };

  // Handle delete button click
  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(orderId));
      dispatch(fetchOrders());
    }
  };

  // Group orders by their order ID
  const groupOrders = (orders) => {
    const groupedOrders = {};

    orders.forEach((order) => {
      if (!groupedOrders[order.id]) {
        groupedOrders[order.id] = {
          name: order.name,
          phone_number: order.phone_number,
          address: order.address,
          total_amount: order.total_amount,
          payment_method: order.payment_method,
          payment_status: order.payment_status,
          items: [],
          shipping_cost: order.shipping_cost,
        };
      }
      groupedOrders[order.id].items.push({
        product_id: order.product_id,
        order_id: order.id,
        product_name: order.product_name,
        quantity: order.quantity,
        size: order.size,
      });
    });

    return Object.entries(groupedOrders).map(([orderId, orderData]) => ({
      orderId,
      ...orderData,
    }));
  };

  const groupedPendingOrders = groupOrders(pendingOrders);

  console.log(groupedPendingOrders)

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-screen">
      <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {groupedPendingOrders && groupedPendingOrders.length > 0 ? (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Customer Name</th>
              <th className="border px-4 py-2">Phone Number</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Items</th>
              <th className="border px-4 py-2">Sub-Total</th>
              <th className="border px-4 py-2">Shipping Cost</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Payment Method</th>
              <th className="border px-4 py-2">Payment Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groupedPendingOrders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{order.name}</td>
                <td className="border px-4 py-2">{order.phone_number}</td>
                <td className="border px-4 py-2">{order.address}</td>
                <td className="border px-4 py-2">
                  {order.items.map((item, index) => (
                    <div key={`${item.product_id}-${index}`}>
                      {item.product_name} (Qty: {item.quantity} Size:{item.size})
                      <button
                        className="text-red-500 hover:underline ml-2"
                        onClick={() => removeItem(index, order.orderId, item.product_id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </td>
                <td className="border px-4 py-2">{order.total_amount}</td>
                <td className="border px-4 py-2">{order.shipping_cost}</td>
                <td className="border px-4 py-2">
                  {parseFloat(order.total_amount) + parseFloat(order.shipping_cost)}
                </td>
                <td className="border px-4 py-2">{order.payment_method}</td>
                <td className="border px-4 py-2">{order.payment_status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(order)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.orderId)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending orders found</p>
      )}

      {/* Show edit form if editing */}
      {editingOrder && (
        <UpdateOrder
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleItemChange={handleItemChange}
          removeItem={removeItem}
        />
      )}
    </div>
  );
};

export default PendingOrders;
