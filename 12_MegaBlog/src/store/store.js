import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/authSlice.js';

const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});

export default store;