import NavButton from '../NavButton/NavButton';
import styles from './banner.module.css';
const Banner = () => {
  return (
    <section className={styles.bannerContainer}>
      <article className={styles.bannerBox}>
        <h1 className={styles.backgroundText}>Goods4you</h1>
        <p className={styles.description}>
          Any products from famous brands with worldwide delivery
        </p>
        <p className={styles.text}>
          We sell smartphones, laptops, clothes, shoes and many other products
          at low prices
        </p>
        <NavButton anchor="catalog">Go to shopping</NavButton>
      </article>
    </section>
  );
};

export default Banner;
