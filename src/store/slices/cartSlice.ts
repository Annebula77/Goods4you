import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type CartProductModel, type CartModel } from '../../models/cartSchema';
import { fetchCart } from '../thunks/cartThunk';
import { updateCart } from '../thunks/updateCartThunk';

interface CartState {
  cart: CartModel | null;
  loading: boolean;
  error: string | null;
  removedProducts: CartProductModel[];
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
  removedProducts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const product = state.cart?.products.find(p => p.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },

    addRemovedProduct: (state, action: PayloadAction<CartProductModel>) => {
      state.removedProducts.push(action.payload);
    },
    setRemovedProducts: (state, action: PayloadAction<CartProductModel[]>) => {
      state.removedProducts = action.payload;
    },
  },
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
    builder.addCase(updateCart.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      const updatedCart = {
        ...action.payload,
        products: action.payload.products.map(product => ({
          ...product,
          discountedTotal: product.discountedPrice,
        })),
      } as CartModel;

      state.loading = false;
      state.cart = updatedCart;
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to update cart';
    });
  },
});

export const { setQuantity, addRemovedProduct, setRemovedProducts } =
  cartSlice.actions;

export default cartSlice.reducer;
