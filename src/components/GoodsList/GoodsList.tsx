/* eslint-disable prettier/prettier */
import Button from '../Button/Button';
import ProductsGallery from '../ProductsGallery/ProductsGallery';

import { debounce, differenceBy } from 'lodash';
import SearchInput from '../SearchInput/SearchInput';
import styles from './goodsList.module.css';
import { useGetProductsQuery } from '../../store/slices/productsApiSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart, decrementQuantity, incrementQuantity, updateQuantity } from '../../store/slices/cartSlice';
import {
  setLoadedProducts,
  setSkip,
  setSearchTerm,
  setLimit,
} from '../../store/slices/loadedProductsSlice';

const GoodsList = () => {

  const dispatch = useAppDispatch();
  const { loadedProducts, skip, searchTerm, limit } = useAppSelector(state => state.loadedProducts);

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
        dispatch(setLoadedProducts(skip === 0 ? newProducts : [...loadedProducts, ...uniqueNewProducts]));
      }
      dispatch(setSkip(skip));
      dispatch(setLimit(limit));

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, skip, limit]);

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

  return (
    <section id="catalog" className={styles.goodsContainer}>
      <h2 className={styles.title}>Catalog</h2>
      <SearchInput onChange={e => debouncedSearch(e.target.value)} />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading products</div>}
      {searchTerm && data?.products.length === 0 && <div>No products found</div>}
      {loadedProducts.length > 0 && (
        <ProductsGallery
          products={loadedProducts}
          onAddToCart={handleAddToCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onInputChange={handleInputChange}
        />
      )}
      {data && skip + limit < data.total && (
        <div className={styles.buttonContainer}>
          <Button onClick={handleLoadMore}>Show more</Button>
        </div>
      )}
    </section>
  );
};

export default GoodsList;
