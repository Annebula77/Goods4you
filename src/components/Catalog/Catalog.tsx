import Banner from '../Banner/Banner';
import GoodsList from '../GoodsList/GoodsList';
import FAQList from '../FAQList/FAQList';
import styles from './catalog.module.css';

const Catalog = () => {
  return (
    <section className={styles.catalogContainer}>
      <Banner />
      <GoodsList />
      <FAQList />
    </section>
  );
};

export default Catalog;
