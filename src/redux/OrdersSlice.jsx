import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get("/orders");
  console.log('Orders fetched from API:', response.data);  // Log API response
  return response.data;
});


// Async thunk to delete an order from the backend
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await axios.delete(`/order/${orderId}`);  // Note: the endpoint should be `/order/${orderId}`
      return orderId;  // Return the ID of the deleted order
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to delete order');
    }
  }
);

// Update order async thunk
export const updateOrder = createAsyncThunk('orders/updateOrder', async ({ id, updatedOrder }, { rejectWithValue }) => {
  console.log(updatedOrder)
  try {
    const response = await axios.put(`/orders/${id}`, updatedOrder);
    
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to update order');
  }
});;

// Initial state for the order slice
const initialState = {
  orders: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// The order slice
const OrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })


      .addCase(fetchOrders.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.orders = action.payload;
          console.log('Updated state.orders:', state.orders); 
        })



      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Delete order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete order';
      })

      // Update order
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;  // Update the specific order in the list
        }
      })

      .addCase(updateOrder.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update order';
      });
  },
});

export default OrdersSlice.reducer;
