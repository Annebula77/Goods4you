/* eslint-disable prettier/prettier */
import Button from '../Button/Button';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import InvalidEntry from '../InvalidEntry/InvalidEntry';
import Loader from '../Loader/Loader';
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
    totalProducts,
    submittingProducts
  } = useGoodsList();

  return (
    <section id="catalog" className={styles.goodsContainer}>
      <h2 className={styles.title}>Catalog</h2>
      <SearchInput onChange={e => debouncedSearch(e.target.value)} />
      {isLoading && <Loader />}
      {error && <ErrorComponent />}
      {searchTerm && loadedProducts.length === 0 && <InvalidEntry />}
      {loadedProducts.length > 0 && (
        <ProductsGallery
          products={loadedProducts}
          onAddToCart={handleAddToCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onInputChange={handleInputChange}
          submittingProducts={submittingProducts}

        />
      )}
      {loadedProducts.length < totalProducts && (
        <div className={styles.buttonContainer}>
          <Button onClick={handleLoadMore} type='button'>Show more</Button>
        </div>
      )}
    </section>
  );
};

export default GoodsList;
