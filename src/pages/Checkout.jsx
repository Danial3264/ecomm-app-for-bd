import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Home/Hero/Navbar';
import Footer from '../components/Home/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { deleteItem } from '../redux/CartSlice';

const Checkout = () => {
  const [shippingCost, setShippingCost] = useState(0)
  const [categories, setCategories] = useState([])
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // State for customer info
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone_number: '',
    email: ''
  });


  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
  const [transactionMobile, setTransactionMobile] = useState('');
 


// Fetch categories on component mount
useEffect(() => {
  axios.get('/categories')
    .then(response => {
      setCategories(response.data); // Assuming response.data contains available categories with shipping costs
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
}, []);

// Handle shipping cost calculation: take the highest shipping cost of the items' categories
useEffect(() => {
  if (cart.length > 0) {
    // Extract the shipping costs for the categories of the cart items
    const shippingCosts = cart.map(item => {
      const category = categories.find(cat => cat.id === item.category_id); // Assuming each item has a category_id
      return category ? category.category_shippingCost : 0; // Get the shipping cost of the category
    });

    // Set the highest shipping cost
    if (shippingCosts.length > 0) {
      const maxShippingCost = Math.max(...shippingCosts);
      setShippingCost(maxShippingCost);
    }
  }
}, [cart, categories]);



  // Capture form data
  const handleChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  // Handle payment method change
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value !== 'bkash' && e.target.value !== 'nagad') {
      setTransactionMobile('');
    }
  };


  console.log(cart)
  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + (item.offer_price || item.product_price) * item.quantity, 0);
  const grandTotal = totalPrice + shippingCost; // Add shipping cost to total

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique order number
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number
    const orderNumber = `SUNNAH${randomNumber}`; // Combine with 'Sunnah'

    // Prepare data for submission
    const data = {
      customer: customerInfo,
      items: cart,
      total: totalPrice,
      payment_method: paymentMethod,
      transaction_mobile: transactionMobile,
      orderNumber: orderNumber, 
      shippingCost: shippingCost
    };

    console.log(data)

    try {
      const response = await axios.post('/create-order', data);
      const orderId = response.data.orderId;

      console.log('Success:', response.data);
      navigate('/thanks', { state: { orderId, shippingCost, orderNumber, cart } });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

   // Handle deleting an item from the cart
   const handleDelete = (itemId, size) => {
    dispatch(deleteItem({id: itemId, size})); // Dispatch the action to remove the item
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left section: Checkout Form */}
          <form className="bg-white p-6 border border-gray-300 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
            
            <label className="text-lg font-medium mb-2" htmlFor="name">Full Name</label>
            <input 
              className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
              type="text" 
              name="name" 
              id="name" 
              placeholder="Enter your full name"
              value={customerInfo.name}
              onChange={handleChange}
              required
            />
            
            <label className="text-lg font-medium mb-2" htmlFor="address">Address</label>
            <input 
              className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
              type="text" 
              name="address" 
              id="address" 
              placeholder="Enter your address"
              value={customerInfo.address}
              onChange={handleChange}
              required
            />

            <label className="text-lg font-medium mb-2" htmlFor="phone_number">Phone Number</label>
            <input 
              className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
              type="text" 
              name="phone_number" 
              id="phone_number" 
              placeholder="Enter your phone number"
              value={customerInfo.phone_number}
              onChange={handleChange}
              required
            />

            <label className="text-lg font-medium mb-2" htmlFor="email">Email</label>
            <input 
              className="mb-6 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Enter your email"
              value={customerInfo.email}
              onChange={handleChange}
              required
            />

            {/* Payment Method Selection */}
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="mb-4">
              <label className="mr-4">
                <input 
                  type="radio" 
                  name="payment_method" 
                  value="bkash" 
                  checked={paymentMethod === 'bkash'} 
                  onChange={handlePaymentChange} 
                /> Bkash
              </label>
              <label className="mr-4">
                <input 
                  type="radio" 
                  name="payment_method" 
                  value="nagad" 
                  checked={paymentMethod === 'nagad'} 
                  onChange={handlePaymentChange} 
                /> Nagad
              </label>
              <label>
                <input 
                  type="radio" 
                  name="payment_method" 
                  value="cash_on_delivery" 
                  checked={paymentMethod === 'cash_on_delivery'} 
                  onChange={handlePaymentChange} 
                /> Cash on Delivery
              </label>
            </div>

            {/* Show transaction mobile input for Bkash or Nagad */}
            {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
              <div className="mb-6">
                <label className="text-lg font-medium mb-2" htmlFor="transaction_mobile">Transaction Mobile Number</label>
                <input 
                  className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
                  type="text" 
                  name="transaction_mobile" 
                  id="transaction_mobile" 
                  placeholder="Enter your transaction mobile number"
                  value={transactionMobile}
                  onChange={(e) => setTransactionMobile(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Show cashback message for Bkash or Nagad */}
            {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
              <p className="text-green-600 font-medium mb-4">Get 5% cashback for using Bkash or Nagad!</p>
            )}

            <button 
              className="bg-blue-600 text-white w-full py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold text-xl"
              type="submit"
            >
              PAY {grandTotal} TK.
            </button>
          </form>

          {/* Right section: Cart Summary */}
          <div className="bg-gray-100 p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>
            
            {cart.length > 0 ? (
              <div>
                {cart.map((item) => (
                  <div key={item.id} className="relative flex justify-between items-center mb-4 p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                    <div className="flex space-x-4">
                      <img className="w-20 h-20 rounded-lg" src={`../../assets/images/${item.product_image}`} alt="" />
                      <div>
                        <p className="text-lg font-medium">{item.product_name}</p>
                        <p className="text-sm text-gray-600">Price: {item.offer_price || item.product_price} BDT</p>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>

                    {/* Delete Icon */}
                    <button 
                      className="absolute top-0 right-0 mt-2 mr-2 text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(item.id, item.size)}
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                ))}


                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg">
                    <span>Sub Total</span>
                    <span>{totalPrice} BDT</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Shipping Cost</span>
                    <span>{shippingCost} BDT</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                    <span>Total</span>
                    <span>{grandTotal} BDT</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
