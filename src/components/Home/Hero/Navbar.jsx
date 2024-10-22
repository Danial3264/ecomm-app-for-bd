import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import Search from './Search';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity, increaseQuantity } from '../../../redux/CartSlice';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setOpenSearch] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const products = useSelector((state) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = () => {
    setOpenSearch(!isOpenSearch);
  };

  const handleProductSearch = (searchValue) => {
    const value = searchValue.toLowerCase();
    if (value === '') {
      setFilteredProducts([]);
      return;
    }
    const newProducts = products.filter((product) => {
      const productName = product.product_name.toLowerCase();
      return productName.includes(value);
    });

    setFilteredProducts(newProducts);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios.get('/categories')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, product) => acc + product.product_price * product.quantity, 0);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));  // Add product to cart
  };

  const handleIncreaseQuantity = (productId, size) => {
    dispatch(increaseQuantity({ id: productId, size }));
  };

  const handleDecreaseQuantity = (productId, size) => {
    dispatch(decreaseQuantity({ id: productId, size }));
  };

  const getCartItem = (productId, size) => {
    return cartItems.find((item) => item.id === productId && item.size === size);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center space-x-2">
        <Link to="/" className="text-white font-bold text-xl"><Logo /></Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/shop" className="text-gray-300 hover:text-white">Shop</Link>
        </div>

        <div className="flex items-center space-x-4 text-white">
          <FaSearch onClick={handleSearch} className="cursor-pointer" />
          {isOpenSearch ? <Search onSearch={handleProductSearch} /> : null}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-700 p-4 space-y-2">
          {categories.map((category) => (
            <Link
              to={`/shop?category=${category.id}`}
              key={category.id}
              className="block text-gray-300 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {category.category_name}
            </Link>
          ))}
        </div>
      )}

      {isOpenSearch && filteredProducts.length > 0 && (
        <div className="absolute bg-white shadow-lg rounded-lg w-full max-w-md mt-2 right-0 text-black p-4 z-50 space-y-2">
          {filteredProducts.map((product) => {
            const cartItem = getCartItem(product.id, product.size); // Update to include size
            return (
              <div key={product.id} className="block hover:bg-gray-100 p-2 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <img className="w-12 h-12 rounded-lg object-cover" src={`../../assets/images/${product.product_image}`} alt={product.product_name} />
                  <div className="flex-grow flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-800">{product.product_name}</p>
                      <p className="text-gray-500">Price: ৳{product.offer_price || product.product_price}</p>
                      {cartItem ? (
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => handleDecreaseQuantity(cartItem.id, cartItem.size)}>-</button>
                          <span className="text-lg font-semibold">{cartItem.quantity}</span>
                          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => handleIncreaseQuantity(cartItem.id, cartItem.size)}>+</button>
                        </div>
                      ) : (
                        <button className="rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-md font-semibold p-2 mt-2 hover:animate-bounce" onClick={() => handleAddToCart(product)}>
                          Add to Cart
                        </button>
                      )}
                    </div>
                    <Link to={`/product/${product.id}`} className="rounded text-lg font-bold p-2 ml-4 text-right">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
