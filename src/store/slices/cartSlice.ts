import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        price: number;
        discountPercentage: number;
        thumbnail: string;
      }>
    ) => {
      const { id, title, price, discountPercentage, thumbnail } =
        action.payload;
      const existingProduct = state.cart?.products.find(p => p.id === id);

      if (!existingProduct) {
        const newProduct = {
          id,
          title,
          price,
          quantity: 1,
          total: price,
          discountPercentage,
          discountedTotal: price * (1 - discountPercentage / 100),
          thumbnail,
        };
        state.cart?.products.push(newProduct);
      } else {
        existingProduct.quantity += 1;
        existingProduct.total += price;
        existingProduct.discountedTotal +=
          price * (1 - discountPercentage / 100);
      }

      state.cart!.total = state.cart!.products.reduce(
        (acc, product) => acc + product.total,
        0
      );
      state.cart!.discountedTotal = state.cart!.products.reduce(
        (acc, product) => acc + product.discountedTotal,
        0
      );
      state.cart!.totalProducts = state.cart!.products.length;
      state.cart!.totalQuantity = state.cart!.products.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const product = state.cart?.products.find(p => p.id === productId);

      if (!product) {
        return;
      }

      product.quantity += 1;
      product.total += product.price;
      product.discountedTotal +=
        product.price * (1 - product.discountPercentage / 100);

      state.cart!.total += product.price;
      state.cart!.discountedTotal +=
        product.price * (1 - product.discountPercentage / 100);
      state.cart!.totalQuantity += 1;
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const product = state.cart?.products.find(p => p.id === productId);

      if (!product) {
        return;
      }

      product.quantity -= 1;
      product.total -= product.price;
      product.discountedTotal -=
        product.price * (1 - product.discountPercentage / 100);

      if (product.quantity === 0) {
        state.cart!.total = state.cart!.products.reduce(
          (acc, product) => acc + product.total,
          0
        );
      }

      state.cart!.total -= product.price;
      state.cart!.discountedTotal -=
        product.price * (1 - product.discountPercentage / 100);
      state.cart!.totalQuantity -= 1;
      state.cart!.totalProducts = state.cart!.products.length;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const product = state.cart?.products.find(p => p.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const product = state.cart?.products.find(p => p.id === productId);

      if (!product) {
        return;
      }

      product.quantity = 0;
      product.total = 0;
      product.discountedTotal = 0;

      state.cart!.total = state.cart!.products.reduce(
        (acc, product) => acc + product.total,
        0
      );
      state.cart!.discountedTotal = state.cart!.products.reduce(
        (acc, product) => acc + product.discountedTotal,
        0
      );
      state.cart!.totalQuantity = state.cart!.products.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
      state.cart!.totalProducts = state.cart!.products.length;
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
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
  deleteProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
