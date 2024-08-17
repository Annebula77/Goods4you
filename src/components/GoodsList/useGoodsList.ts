import { useEffect } from 'react';
import { debounce, differenceBy } from 'lodash';
import { useGetProductsQuery } from '../../store/slices/productsApiSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  updateQuantity,
} from '../../store/slices/cartSlice';
import {
  setLoadedProducts,
  setSkip,
  setSearchTerm,
  setLimit,
} from '../../store/slices/loadedProductsSlice';

export const useGoodsList = () => {
  const dispatch = useAppDispatch();
  const { loadedProducts, skip, searchTerm, limit } = useAppSelector(
    state => state.loadedProducts
  );
  const cart = useAppSelector(state => state.cart.cart);
  const { data, error, isLoading } = useGetProductsQuery({
    q: searchTerm,
    limit,
    skip,
  });

  useEffect(() => {
    if (data) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, skip, limit, cart]);

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
  }, 500);

  const handleAddToCart = (id: number) => {
    const product = loadedProducts.find(p => p.id === id);
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          discountPercentage: product.discountPercentage ?? 0,
          thumbnail: product.thumbnail,
        })
      );
    }
  };

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleInputChange = (id: number, value: number) => {
    if (value > 0) {
      dispatch(updateQuantity({ id, quantity: value }));
    }
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
    totalProducts: data?.total ?? 0,
  };
};
