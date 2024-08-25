import { useEffect } from 'react';
import { debounce, differenceBy } from 'lodash';
import { useGetProductsQuery } from '../../store/slices/productsApiSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  setLoadedProducts,
  setSkip,
  setSearchTerm,
  setLimit,
} from '../../store/slices/loadedProductsSlice';
import { useCartActions } from '../../utils/hooks/useCartActions';
import { type CartProductModel } from '../../models/cartSchema';
import { type ProductWithCartInfo } from '../../types/productType';
import { skipToken } from '@reduxjs/toolkit/query';
import { ErrorType } from '../../types/errorType';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export const useGoodsList = (user: User | undefined, error: ErrorType) => {
  const dispatch = useAppDispatch();
  const { loadedProducts, skip, searchTerm, limit } = useAppSelector(
    state => state.loadedProducts
  );

  const cart = useAppSelector(state => state.cart.cart);
  const isAuthenticated = Boolean(user) && !error;

  const queryArgs = isAuthenticated
    ? { q: searchTerm, limit, skip }
    : skipToken;

  const { data, isLoading } = useGetProductsQuery(queryArgs);

  useEffect(() => {
    if (!isAuthenticated || !data) {
      return;
    }

    const newProducts = data.products.map(product => {
      const cartProduct = cart?.products.find(p => p.id === product.id);

      return {
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        quantityInCart: cartProduct ? cartProduct.quantity : 0,
        currentQuantity: cartProduct ? cartProduct.quantity : 0,
        isAddedToCart: Boolean(cartProduct),
      };
    });

    const uniqueNewProducts = differenceBy(newProducts, loadedProducts, 'id');

    if (uniqueNewProducts.length > 0) {
      dispatch(
        setLoadedProducts(
          skip === 0 ? newProducts : [...loadedProducts, ...uniqueNewProducts]
        )
      );
    }
    dispatch(setSkip(skip));
    dispatch(setLimit(limit));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, skip, limit, cart, error, user]);

  const updateLoadedProductsWithCartInfo = () => {
    const newProducts = loadedProducts.map(product => {
      const cartProduct = cart?.products.find(p => p.id === product.id);

      return {
        ...product,
        quantityInCart: cartProduct ? cartProduct.quantity : 0,
        currentQuantity: cartProduct ? cartProduct.quantity : 0,
        isAddedToCart: Boolean(cartProduct && cartProduct.quantity > 0),
      };
    });

    dispatch(setLoadedProducts(newProducts));
  };

  useEffect(() => {
    updateLoadedProductsWithCartInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const debouncedSearch = debounce((term: string) => {
    dispatch(setSearchTerm(term));
    dispatch(setSkip(0));
    dispatch(setLimit(12));
    dispatch(setLoadedProducts([]));
  }, 800);

  const {
    addProductToCart,
    incrementProductQuantity,
    decrementProductQuantity,
    updateProductQuantity,
    submittingProducts,
  } = useCartActions();

  const handleAddToCart = (product: ProductWithCartInfo) => {
    const productForCart: CartProductModel = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      discountPercentage: product.discountPercentage ?? 0,
      thumbnail: product.thumbnail,
      total: product.price * 1,
      discountedTotal:
        product.price * (1 - (product.discountPercentage ?? 0) / 100),
    };

    addProductToCart(productForCart);
  };

  const handleIncrement = (id: number) => {
    incrementProductQuantity(id);
  };

  const handleDecrement = (id: number) => {
    decrementProductQuantity(id);
  };

  const handleInputChange = (id: number, value: number) => {
    updateProductQuantity(id, value);
  };
  const handleLoadMore = () => {
    if (data && skip + limit < data.total) {
      dispatch(setSkip(skip + limit));
    }
  };

  return {
    loadedProducts,
    isLoading,
    error,
    searchTerm,
    debouncedSearch,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    handleInputChange,
    handleLoadMore,
    submittingProducts,
    totalProducts: data?.total ?? 0,
  };
};
