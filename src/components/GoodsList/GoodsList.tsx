/* eslint-disable prettier/prettier */
import { useUser } from '../../utils/context/useUser';
import Button from '../Button/Button';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import InvalidEntry from '../InvalidEntry/InvalidEntry';
import Loader from '../Loader/Loader';
import ProductsGallery from '../ProductsGallery/ProductsGallery';
import SearchInput from '../SearchInput/SearchInput';
import styles from './goodsList.module.css';
import { useGoodsList } from './useGoodsList';


const GoodsList = () => {

  const { user, error, userIsLoading } = useUser();

  const {
    loadedProducts,
    isLoading,
    searchTerm,
    debouncedSearch,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    handleInputChange,
    handleLoadMore,
    totalProducts,
    submittingProducts,
    productError
  } = useGoodsList(user, error);

  const errors = error || productError;
  const noProducts = searchTerm && loadedProducts.length === 0 && !errors;

  if (userIsLoading) return <Loader />

  return (
    <section id="catalog" className={styles.goodsContainer}>
      <h2 className={styles.title}>Catalog</h2>
      <SearchInput onChange={e => debouncedSearch(e.target.value)} value={searchTerm} />
      {isLoading && <Loader />}
      {noProducts && <InvalidEntry />}
      {!errors ? (
        <>
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
        </>) : (<ErrorComponent />)}

    </section>
  );
};

export default GoodsList;
