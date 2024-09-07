import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type ProductWithCartInfo } from '../../types/productType';

interface ProductsState {
  loadedProducts: ProductWithCartInfo[];
  skip: number;
  searchTerm: string;
  limit: number;
}

const initialState: ProductsState = {
  loadedProducts: [],
  skip: 0,
  searchTerm: '',
  limit: 12,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoadedProducts(state, action: PayloadAction<ProductWithCartInfo[]>) {
      state.loadedProducts = action.payload;
    },
    setSkip(state, action: PayloadAction<number>) {
      state.skip = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    resetProductsState(state) {
      state.loadedProducts = [];
      state.skip = 0;
      state.searchTerm = '';
      state.limit = 12;
    },
  },
});

export const {
  setLoadedProducts,
  setSkip,
  setSearchTerm,
  setLimit,
  resetProductsState,
} = productsSlice.actions;

export default productsSlice.reducer;
