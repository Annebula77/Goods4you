import { Link } from 'react-router-dom';
import styles from './errorComponent.module.css';

const ErrorComponent = () => {
  return (
    <section className={styles.container}>
      <img
        className={styles.picture}
        src="/error.webp"
        alt="error"
        loading="lazy"
        decoding="async"
      />
      <h1 className={styles.title}>Something went wrong. Sorry...</h1>
      <Link className={styles.link} to="/">
        Go back to safety
      </Link>
    </section>
  );
};

export default ErrorComponent;
