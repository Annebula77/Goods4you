import Banner from '../Banner/Banner';
import GoodsList from '../GoodsList/GoodsList';
import styles from './catalog.module.css';

const Catalog = () => {
  return (
    <section className={styles.catalogContainer}>
      <Banner />
      <GoodsList />
    </section>
  );
};

export default Catalog;
