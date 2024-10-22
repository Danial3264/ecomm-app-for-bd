import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity, increaseQuantity } from '../../redux/CartSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllProducts = ({ products = [] }) => {
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Available sizes state
  const [availableSizes, setAvailableSizes] = useState([]);

  // Fetch available product sizes
  useEffect(() => {
    axios.get('/product-sizes') // Replace with your actual API endpoint
      .then(response => {
        setAvailableSizes(response.data); // Assuming response.data contains available sizes
      })
      .catch(error => {
        console.error('Error fetching sizes:', error);
      });
  }, []);

  // Local state for selected sizes for each product
  const [selectedSizes, setSelectedSizes] = useState({});

  // Handle add to cart action
  const handleAddToCart = (product) => {
    const selectedSize = selectedSizes[product.id];
    if (product.size === 'Yes' && !selectedSize) {
      alert('Please select a size before adding to cart.');
    } else {
      dispatch(addToCart({ ...product, quantity: 1, size: selectedSize }));
    }
  };

  // Handle increase quantity action
  const handleIncreaseQuantity = (productId, size) => {
    dispatch(increaseQuantity({ id: productId, size }));
  };

  // Handle decrease quantity action
  const handleDecreaseQuantity = (productId, size) => {
    dispatch(decreaseQuantity({ id: productId, size }));
  };

  // Check if the product is in the cart with the specific size
  const getCartItem = (productId, size) => {
    return cartItems.find((item) => item.id === productId && item.size === size);
  };

  // Handle size change for a specific product
  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [productId]: size,
    }));
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-screen-2xl space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-x-2 space-y-2">
          {products.map((product) => {
            const selectedSize = selectedSizes[product.id] || '';
            const cartItem = getCartItem(product.id, selectedSize);

            return (
              <div key={product.id} className="group relative space-x-2 border rounded-lg p-4 bg-gray-100">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    alt={product.product_name}
                    src={`../../assets/images/${product.product_image}`}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="mt-4 text-lg text-gray-700 font-bold">{product.product_name}</h3>
                  <div className="flex">
                    {product.offer_price ? (
                      <>
                        <p className="mt-1 text-lg font-medium text-gray-500 line-through mr-2">{product.product_price} TK.</p>
                        <p className="mt-1 text-lg font-medium text-red-500">{product.offer_price} TK.</p>
                      </>
                    ) : (
                      <p className="mt-1 text-lg font-medium text-red-500">{product.product_price} TK.</p>
                    )}
                  </div>

                  {/* Size selection */}
                  {product.size === 'Yes' && (
                    <div className="mt-2">
                      <label htmlFor={`size-${product.id}`} className="block text-gray-700">Select Size:</label>
                      <select
                        id={`size-${product.id}`}
                        className="border rounded p-2"
                        value={selectedSize}
                        onChange={(e) => handleSizeChange(product.id, e.target.value)}
                      >
                        <option value="">Select Size</option>
                        {availableSizes.map((size) => (
                          <option key={size.id} value={size.size}>{size.size}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {cartItem ? (
                    <div className="flex items-center space-x-4 mt-2">
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => handleDecreaseQuantity(cartItem.id, cartItem.size)}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{cartItem.quantity}</span>
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => handleIncreaseQuantity(cartItem.id, cartItem.size)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-lg font-semibold p-2 mt-2 hover:animate-bounce"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.size === 'Yes' && !selectedSize} // Disable if size is required and not selected
                    >
                      Add to Cart
                    </button>
                  )}

                  <Link to={`/product/${product.id}`} className="rounded text-lg font-bold p-2 mt-2 text-center">
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
