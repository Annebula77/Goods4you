import styles from './counter.module.css';
interface CounterProps {
  quantity: number | undefined;
}
const Counter: React.FC<CounterProps> = ({ quantity = undefined }) => {
  if (quantity === undefined) {
    return null;
  }

  const containerSize = quantity >= 10 ? styles.large : styles.small;
  return (
    <div className={`${styles.container} ${containerSize}`}>
      <p className={styles.text}>{quantity}</p>
    </div>
  );
};

export default Counter;
