import Button from '../Button/Button';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import styles from './quantityButton.module.css';

interface QuantityButtonProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onInputChange: (value: number) => void;
  decrementDisabled?: boolean;
  incrementDisabled?: boolean;
  hovered?: boolean;
  background?: boolean;
}
const QuantityButton: React.FC<QuantityButtonProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  onInputChange,
  decrementDisabled,
  incrementDisabled,
  hovered,
  background,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      return;
    }

    onInputChange(value);
  };
  return (
    <ul className={styles.inputContainer}>
      <li className={styles.inputItem}>
        <Button
          onClick={onDecrement}
          disabled={decrementDisabled || quantity <= 0}
          padding="23.5px 16px"
        >
          <MinusIcon className={styles.icon} aria-label="decrease quantity" />
        </Button>
      </li>
      <li className={styles.inputItem}>
        <input
          type="text"
          value={`${quantity} ${quantity === 1 ? 'item' : 'items'}`}
          onChange={handleChange}
          aria-label="quantity"
          className={`${styles.numberInput} ${hovered || background ? styles.hovered : ''}`}
          readOnly
        />
      </li>
      <li className={styles.inputItem}>
        <Button
          onClick={onIncrement}
          disabled={incrementDisabled}
          padding="16px"
        >
          <PlusIcon className={styles.icon} aria-label="increase quantity" />
        </Button>
      </li>
    </ul>
  );
};
export default QuantityButton;
