import styles from './counter.module.css';
interface CounterProps {
  quantity: number;
}
const Counter: React.FC<CounterProps> = ({ quantity = 0 }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{quantity}</p>
    </div>
  );
};

export default Counter;
