import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/ProductThunks';
import { addToCart, decreaseQuantity, increaseQuantity } from '../../redux/CartSlice';
import { Link } from 'react-router-dom';

const AllProducts = ({ products }) => {
  const dispatch = useDispatch(); // Initialize dispatch
  
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Handle add to cart action
  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  // Handle increase quantity action
  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  // Handle decrease quantity action
  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  // Check if the product is in the cart and get its quantity
  const getCartItem = (productId) => {
    return cartItems.find((item) => item.id === productId);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-screen-2xl space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-x-2 space-y-2">
          {products.map((product) => {
            const cartItem = getCartItem(product.id);

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
                  <h3 className="mt-4 text-lg text-gray-700 font-bold ">{product.product_name}</h3>
                  <p className="mt-1 text-lg font-medium text-red-300">${product.product_price}</p>

                  {cartItem ? (
                    <div className="flex items-center space-x-4 mt-2">
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => handleDecreaseQuantity(cartItem.id)}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{cartItem.quantity}</span>
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => handleIncreaseQuantity(cartItem.id)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-lg font-semibold p-2 mt-2 hover:animate-bounce"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                  <Link to={`/product/${product.id}`} className="rounded text-lg font-bold p-2 mt-2 text-center">View Details</Link>
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
