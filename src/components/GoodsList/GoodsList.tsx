/* eslint-disable prettier/prettier */
import Button from '../Button/Button';
import ProductsGallery from '../ProductsGallery/ProductsGallery';
import SearchInput from '../SearchInput/SearchInput';
import styles from './goodsList.module.css';
import { useGoodsList } from './useGoodsList';


const GoodsList = () => {
  const {
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
    totalProducts
  } = useGoodsList();

  return (
    <section id="catalog" className={styles.goodsContainer}>
      <h2 className={styles.title}>Catalog</h2>
      <SearchInput onChange={e => debouncedSearch(e.target.value)} />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading products</div>}
      {searchTerm && loadedProducts.length === 0 && <div>No products found</div>}
      {loadedProducts.length > 0 && (
        <ProductsGallery
          products={loadedProducts}
          onAddToCart={handleAddToCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onInputChange={handleInputChange}

        />
      )}
      {loadedProducts.length < totalProducts && (
        <div className={styles.buttonContainer}>
          <Button onClick={handleLoadMore}>Show more</Button>
        </div>
      )}
    </section>
  );
};

export default GoodsList;
