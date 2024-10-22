import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '../redux/ProductSlice';
import OrdersReducer from '../redux/OrdersSlice';
import cartReducer from '../redux/CartSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { combineReducers } from 'redux';

// Define persist configuration for cart slice
const cartPersistConfig = {
  key: 'cart',
  storage,
};

// Wrap the cartReducer with persistReducer
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Combine reducers
const rootReducer = combineReducers({
  orders: OrdersReducer,
  products: ProductReducer,
  cart: persistedCartReducer, // Use persisted cart reducer

});

// Create the store with persisted reducer
export const store = configureStore({
  reducer: rootReducer,
});

// Persistor, used for persisting the store
export const persistor = persistStore(store);
