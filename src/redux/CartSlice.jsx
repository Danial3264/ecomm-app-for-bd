import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
      
    addToCart: (state, action) => {
      const { id, size } = action.payload;


      console.log('Slice:',size)

      // Check if the product with the same size already exists in the cart
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      );

      if (existingItem) {
        // If item with the same size exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the item to the cart
        state.items.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const { id, size } = action.payload;

      // Find the item with the same product ID and size
      const item = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const { id, size } = action.payload;

      // Find the item with the same product ID and size
      const item = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove the item from the cart if quantity becomes 0
          state.items = state.items.filter(
            (item) => !(item.id === id && item.size === size)
          );
        }
      }
    },
    deleteItem: (state, action) => {
      const { id, size } = action.payload;

      // Remove the item based on product ID and size
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      );
    },
    resetCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteItem, resetCart } = CartSlice.actions;

export default CartSlice.reducer;
