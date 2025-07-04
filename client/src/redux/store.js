import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'; // Ensure this path is correct

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
