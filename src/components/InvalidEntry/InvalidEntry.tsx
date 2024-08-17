import styles from './invalidEntry.module.css';

const InvalidEntry = () => {
  return (
    <section className={styles.loaderContainer}>
      <h1 className={styles.loaderText}>No products found</h1>
    </section>
  );
};

export default InvalidEntry;
