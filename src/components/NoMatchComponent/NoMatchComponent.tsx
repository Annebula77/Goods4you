import { Link } from 'react-router-dom';
import styles from './noMatchComponent.module.css';

const NoMatchComponent = () => {
  return (
    <section className={styles.container}>
      <img
        className={styles.picture}
        src="/404.webp"
        alt="error"
        loading="lazy"
        decoding="async"
      />
      <h1 className={styles.title}>No such page was found</h1>
      <Link className={styles.link} to="/">
        Go back to shopping
      </Link>
    </section>
  );
};

export default NoMatchComponent;
