import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
import filterReducer from './slice/filterSlice';
import cartReducer from './slice/cartSlice'
import checkoutReducer from './slice/checkoutSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  checkout: checkoutReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlware) => 
    getDefaultMiddlware({
      serializableCheck: false
    })
})

export default store;