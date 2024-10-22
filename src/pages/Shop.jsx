// Shop.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Category from '../components/Shop/Category';
import Navbar from '../components/Home/Hero/Navbar';
import Footer from '../components/Home/Footer';
import AllProducts from '../components/Shop/AllProducts';
import CartIcon from '../components/Home/CartIcon';
import axios from 'axios';

const Shop = () => {
  const [animate, setAnimate] = useState(false); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [showProducts, setShowProducts] = useState(false); 

  const location = useLocation(); 

  const getCategoryFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('category'); 
  };

  useEffect(() => {
    const categoryId = getCategoryFromUrl(); 

    setAnimate(true);
    setShowProducts(false); 

    const timeout = setTimeout(() => {
      if (categoryId === null) {
        fetchAllProducts();
      } else {
        fetchProductsByCategory(categoryId);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [location.search]);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
    setShowProducts(true);
  };

  const fetchProductsByCategory = async (category_id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/products/category/${category_id}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
    setLoading(false);
    setShowProducts(true); 
  };

  return (
    <div className="bg-white min-h-screen">
      <div>
        <Navbar />
      </div>
      <CartIcon />

      <div className="container mx-auto flex flex-col md:flex-row items-start pt-10 md:pt-20">
        <div 
          className={`hidden md:block basis-1/4 transform transition-all duration-700 ease-out ${animate ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
        >
          <Category />
        </div>

        <div 
          className={`basis-3/4 transform transition-all duration-700 ease-out ${showProducts ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AllProducts products={products} />
          )}
        </div>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Shop;
