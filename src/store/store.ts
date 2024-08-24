import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import cartReducer from './slices/cartSlice';
import { productsApiSlice } from './slices/productsApiSlice';
import loadedProductsReducer from './slices/loadedProductsSlice';
import { authApiSlice } from './slices/authApiSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    loadedProducts: loadedProductsReducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      productsApiSlice.middleware,
      authApiSlice.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
