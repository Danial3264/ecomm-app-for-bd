import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { FaTrashCan } from "react-icons/fa6";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { increaseQuantity, decreaseQuantity, deleteItem } from "../../redux/CartSlice";
import axios from 'axios';

const Cart = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);


  console.log(cart)

  // Calculate subtotal
  const subtotal = cart.reduce((acc, product) => {
    const price = product.offer_price || product.product_price; // Use offer_price if available
    return acc + price * product.quantity;
  }, 0);

  // Available sizes state
  const [availableSizes, setAvailableSizes] = useState([]);

  // Fetch available product sizes from API
  useEffect(() => {
    axios.get('/product-sizes') // Replace with your actual API endpoint
      .then(response => {
        setAvailableSizes(response.data); // Assuming response.data contains available sizes
      })
      .catch(error => {
        console.error('Error fetching sizes:', error);
      });
  }, []);

  const findSizeName = (sizeName) => {
    const size = availableSizes.find((s) => (s.size) === sizeName);
    return size ? size.size : "Fixed";
  };

  const handleIncrease = (productId, size) => {
    dispatch(increaseQuantity({ id: productId, size }));
  };

  const handleDecrease = (productId, size) => {
    dispatch(decreaseQuantity({ id: productId, size }));
  };

  const handleDelete = (productId, size) => {
    dispatch(deleteItem({ id: productId, size }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">

                {/* Header */}
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                    <button onClick={onClose} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Cart Items */}
                  <div className="mt-8 flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {cart.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              alt={product.product_name}
                              src={`../../assets/images/${product.product_image}`}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{product.product_name}</h3>
                              <p className="ml-4">
                                {product.offer_price ? (
                                  <>
                                    <span className="line-through text-gray-500 mr-2">{product.product_price} BDT</span>
                                    <span className="text-red-500">{product.offer_price} BDT</span>
                                  </>
                                ) : (
                                  <span>{product.product_price} BDT</span>
                                )}
                              </p>
                            </div>

                            {product.size && (
                              <p className="mt-1 text-sm text-gray-500">
                                Size: {findSizeName(product.size)} {/* Assuming product.size is the ID of the size */}
                              </p>
                            )}

                            <p className="mt-1 text-sm text-gray-500">Quantity: {product.quantity}</p>

                            {/* Action buttons */}
                            <div className="flex mt-4">
                              <button onClick={() => handleDecrease(product.id, product.size)} className="bg-gray-200 p-2 rounded-l-lg hover:bg-gray-300">-</button>
                              <button onClick={() => handleIncrease(product.id, product.size)} className="bg-gray-200 p-2 rounded-r-lg hover:bg-gray-300">+</button>
                              <button onClick={() => handleDelete(product.id, product.size)} className="ml-4 bg-red-500 p-2 rounded hover:bg-red-600 text-white"><FaTrashCan /></button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{subtotal} BDT</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a href="/checkout" className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700">
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <button onClick={onClose} className="font-medium text-indigo-600 hover:text-indigo-500">
                      Continue Shopping <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Cart;
