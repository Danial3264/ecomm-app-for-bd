import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/ProductThunks";
import { addToCart, increaseQuantity, decreaseQuantity } from "../../redux/CartSlice";
import { Link } from "react-router-dom";
import axios from 'axios';

const JustForYou = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([])

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(()=>{
    axios.get('/categories')
    .then((response)=>{
      setCategories(response.data)
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    
    });
  },[])

  // Get products, status, and error from the Redux store
  const { products, status, error } = useSelector((state) => state.products);

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Handle add to cart action
  const handleAddToCart = (product, size) => {
    dispatch(addToCart({ ...product, quantity: 1, size }));
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

  // State to track selected sizes for each product
  const [selectedSizes, setSelectedSizes] = useState({});

  // Handle size change for a specific product
  const handleSizeChange = (productId, size) => {
    setSelectedSizes({ ...selectedSizes, [productId]: size });
  };

  // Filter the "Just for You" products (for example, products with category 'JustForYou')
  const justForYouCategory = categories.find((category) => category.category_name === "JustForYou");
  const justForYouProducts = products.filter((product) => product.category_id === justForYouCategory?.id);
  

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-screen-2xl">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}

        {/* "Just for You" Products Section */}
        {justForYouProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Just for You</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-6">
              {justForYouProducts.map((product) => {
                const selectedSize = selectedSizes[product.id] || '';

                // Get cart item based on product ID and selected size
                const cartItem = getCartItem(product.id, selectedSize);

                return (
                  <div key={product.id} className="group relative border p-2 rounded-lg bg-gray-100">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        alt={product.product_name}
                        src={`../../assets/images/${product.product_image}`}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div>
                        <h3 className="mt-4 text-lg text-gray-700 font-bold ">{product.product_name}</h3>
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
                      </div>

                      {/* Size Selection */}
                      {product.size === 'Yes' ? (
                        <select
                          value={selectedSize}
                          onChange={(e) => handleSizeChange(product.id, e.target.value)}
                          className="mt-2 p-2 border rounded"
                        >
                          <option value="">Select Size</option>
                          {availableSizes.map((size) => (
                            <option key={size.id} value={size.id}>
                              {size.size}
                            </option>
                          ))}
                        </select>
                      ) : (
                        ''
                      )}

                      {cartItem ? (
                        <div className="flex items-center space-x-4 mt-2">
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded"
                            onClick={() => handleDecreaseQuantity(product.id, selectedSize)}
                          >
                            -
                          </button>
                          <span className="text-lg font-semibold">{cartItem.quantity}</span>
                          <button
                            className="px-4 py-2 bg-green-500 text-white rounded"
                            onClick={() => handleIncreaseQuantity(product.id, selectedSize)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-lg font-semibold p-2 mt-2 hover:animate-bounce"
                          onClick={() => handleAddToCart(product, selectedSize)}
                          disabled={product.size === 'Yes' && !selectedSize} // Disable only if size is required and not selected
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
        )}
      </div>
    </div>
  );
};

export default JustForYou;
