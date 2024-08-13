import { createSlice } from '@reduxjs/toolkit';
import { CartModel } from '../../models/cartSchema';
import { fetchCart } from '../thunks/cartThunk';

interface CartState {
  cart: CartModel | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCart.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch cart data';
    });
  },
});

export default cartSlice.reducer;
