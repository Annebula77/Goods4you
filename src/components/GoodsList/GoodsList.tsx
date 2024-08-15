/* eslint-disable prettier/prettier */
import Button from '../Button/Button';
import ProductsGallery from '../ProductsGallery/ProductsGallery';

import { debounce } from 'lodash';
import SearchInput from '../SearchInput/SearchInput';
import styles from './goodsList.module.css';
import { useGetProductsQuery } from '../../store/slices/productsApiSlice';
import { useState } from 'react';
import { type ListProductType } from '../../types/productType';

const GoodsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);

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

  const productsData: ListProductType[] | undefined = data
    ? data.products.map(product => ({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      discountPercentage: product.discountPercentage,
      stock: product.stock,
    }))
    : undefined;

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
      {productsData?.length && <ProductsGallery products={productsData} />}
      <div className={styles.buttonContainer}>
        <Button onClick={handleLoadMore}>Show more</Button>
      </div>
    </section>
  );
};

export default GoodsList;
