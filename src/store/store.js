import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from '../services/slices/userSlice';
import modalReducer from '../services/slices/modalSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
