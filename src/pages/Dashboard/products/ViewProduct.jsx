import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, updateProduct, deleteProduct } from '../../../redux/ProductThunks';
import UpdateProduct from './UpdateProduct';
import axios from 'axios';

const Products = () => {
  const dispatch = useDispatch();
  const [editingProduct, setEditingProduct] = useState(null); 
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]); // State for categories

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Fetch categories when component mounts
  useEffect(() => {
    axios.get('/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories!", error);
      });
  }, []);

  const { products, status, error } = useSelector((state) => state.products);

  // Handle edit button click
  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData({
      product_name: product.product_name,
      product_price: product.product_price,
      product_description: product.product_description,
      offer_price: product.offer_price,
      category_id: product.category_id,
      size: product.size,
    });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: editingProduct, updatedData: formData }));
    dispatch(fetchProducts());
    setEditingProduct(null);
  };

  // Handle delete button click
  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  // Get category name based on category_id
  const getCategoryName = (categoryId) => {
    const category = categories.find(category => category.id === categoryId);
    return category ? category.category_name : 'Unknown Category';
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error.message ? error.message : JSON.stringify(error)}</p>}

      {products && products.length > 0 ? (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Product Image</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Product Price</th>
              <th className="border px-4 py-2">Offer Price</th>
              <th className="border px-4 py-2">Category Name</th> {/* Changed to Category Name */}
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">
                  {product.product_image ? (
                    <img
                      src={`/assets/images/${product.product_image}`} // Adjust this path to where your images are stored
                      alt={product.product_name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    'No image'
                  )}
                </td>
                <td className="border px-4 py-2">{product.product_name}</td>
                <td className="border px-4 py-2">{product.product_price}</td>
                <td className="border px-4 py-2">{product.offer_price}</td>
                <td className="border px-4 py-2">{getCategoryName(product.category_id)}</td> {/* Display Category Name */}
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
        <p>No Products found</p>
      )}

      {/* Show edit form if editing */}
      {editingProduct && (
        <UpdateProduct
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Products;
