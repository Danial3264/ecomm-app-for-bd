import { createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';




// Fetch all products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('/products');
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// productThunks.js
export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post('/create-product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || 'Failed to create product');
      }
    }
  );
  

  export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, updatedData }, { rejectWithValue }) => {
      try {
        const formData = new FormData();
  
        // Append form data, skip undefined or null values
        Object.keys(updatedData).forEach((key) => {
          if (updatedData[key] !== undefined && updatedData[key] !== null) {
            formData.append(key, updatedData[key]);
          }
        });
  
        // Make PUT request to update the product
        const res = await axios.put(`/products/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        return res.data;
      } catch (err) {
        console.error("Update product error:", err);  // Log the full error for debugging
        console.error("Error response data:", err.response?.data);  // Log response data for details
        
        // Handle the error, fallback to a default message
        return rejectWithValue(err.response?.data || 'Failed to update product');
      }
    }
  );
  
  

// Delete a product
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/product/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
