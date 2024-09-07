import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import cartReducer from './slices/cartSlice';
import { productsApiSlice } from './slices/productsApiSlice';
import loadedProductsReducer from './slices/loadedProductsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    loadedProducts: loadedProductsReducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productsApiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
