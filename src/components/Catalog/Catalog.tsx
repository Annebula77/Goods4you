import Banner from '../Banner/Banner';
import GoodsList from '../GoodsList/GoodsList';
import FAQList from '../FAQList/FAQList';
import styles from './catalog.module.css';
import { useUser } from '../../utils/context/useUser';
import Loader from '../Loader/Loader';

const Catalog = () => {
  const { user, userIsLoading } = useUser();

  if (!user) return;

  if (userIsLoading) return <Loader />;
  return (
    <section className={styles.catalogContainer}>
      <Banner />
      <GoodsList />
      <FAQList />
    </section>
  );
};

export default Catalog;
