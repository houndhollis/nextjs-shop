import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
import filterReducre from './slice/filterSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducre
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlware) => 
    getDefaultMiddlware({
      serializableCheck: false
    })
})

export default store;