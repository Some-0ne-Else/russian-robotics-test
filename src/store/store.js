import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../services/slices/userSlice';
import contactsReducer from '../services/slices/contactsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
