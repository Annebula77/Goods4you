import Button from '../Button/Button';
import ProductsGallery from '../ProductsGallery/ProductsGallery';
import SearchInput from '../SearchInput/SearchInput';
import styles from './goodsList.module.css';
const GoodsList = () => {
  return (
    <section id="catalog" className={styles.goodsContainer}>
      <h2 className={styles.title}>Catalog</h2>
      <SearchInput />
      <ProductsGallery />
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => {
            alert('will show some day:)');
          }}
        >
          Show more
        </Button>
      </div>
    </section>
  );
};

export default GoodsList;
