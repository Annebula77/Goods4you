import ProductsGallery from '../ProductsGallery/ProductsGallery';
import SearchInput from '../SearchInput/SearchInput';
import styles from './goodsList.module.css';
const GoodsList = () => {
  return (
    <section id="catalog" className={styles.goodsContainer}>
      <h2 className={styles.title}>Catalog</h2>
      <SearchInput />
      <ProductsGallery />
    </section>
  );
};

export default GoodsList;
