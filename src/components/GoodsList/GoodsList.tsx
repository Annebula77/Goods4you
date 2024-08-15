/* eslint-disable prettier/prettier */
import Button from '../Button/Button';
import ProductsGallery from '../ProductsGallery/ProductsGallery';

import { debounce } from 'lodash';
import SearchInput from '../SearchInput/SearchInput';
import styles from './goodsList.module.css';
import { useGetProductsQuery } from '../../store/slices/productsApiSlice';
import { useState } from 'react';
import { type ProductWithCartInfo } from '../../types/productType';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart, decrementQuantity, incrementQuantity, updateQuantity } from '../../store/slices/cartSlice';

const GoodsList = () => {

  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);

  const cart = useAppSelector(state => state.cart.cart);

  const { data, error, isLoading } = useGetProductsQuery({
    q: searchTerm,
    limit,
    skip,
  });

  const debouncedSearch = debounce(term => {
    setSkip(0);
    setSearchTerm(term);
    setLimit(12);
  }, 500);

  const productsData: ProductWithCartInfo[] | undefined = data
    ? data.products.map(product => {
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
    })
    : undefined;

  const handleAddToCart = (id: number) => {
    const product = productsData?.find(p => p.id === id);
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


  console.log(productsData);

  const handleLoadMore = () => {
    if (data && skip + limit < data.total) {
      setSkip(prevSkip => prevSkip + limit);
    }
  };

  return (
    <section id="catalog" className={styles.goodsContainer}>
      <h2 className={styles.title}>Catalog</h2>
      <SearchInput onChange={e => debouncedSearch(e.target.value)} />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading products</div>}
      {productsData?.length && <ProductsGallery
        products={productsData}
        onAddToCart={handleAddToCart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onInputChange={handleInputChange} />}
      <div className={styles.buttonContainer}>
        <Button onClick={handleLoadMore}>Show more</Button>
      </div>
    </section>
  );
};

export default GoodsList;
