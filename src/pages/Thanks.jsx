import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from '../components/Home/Hero/Navbar';
import Footer from '../components/Home/Footer';

const Thanks = () => {
  const location = useLocation(); // Get state from the location object
  const { orderId, shippingCost, orderNumber, cart } = location.state || {}; // Destructure orderId and cart from state
  const subtotal = cart?.reduce((acc, product) => acc + (product.offer_price || product.product_price) * product.quantity, 0) || 0;
  const totalAmount = subtotal + shippingCost;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          {/* Thank you message */}
          <div className="text-center">
            <p className="font-extrabold text-3xl text-green-600">Thank You for Your Order!</p>
            <p className="text-gray-600">Your order is being processed. You'll receive confirmation soon.</p>
          </div>

          {/* Tracking information */}
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-bold text-lg">Order Number</p>
            <p className="text-gray-500">{orderNumber || 'N/A'}</p> {/* Display dynamic orderId */}
          </div>

          {/* Order summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-lg mb-4">Order Summary</p>
            {cart?.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4 mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={`../../assets/images/${item.product_image}`}
                    alt={item.product_name}
                    className="w-20 h-20 rounded"
                  />
                  <div>
                    <p className="font-semibold text-gray-700">{item.product_name}</p>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-gray-500">{item.offer_price||item.product_price}</p>
              </div>
            ))}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{subtotal} Tk.</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>{shippingCost} Tk.</p>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>{totalAmount} Tk.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Thanks;
