import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import cartReducer from './slices/cartSlice';
import { productsApiSlice } from './slices/productsApiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productsApiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
