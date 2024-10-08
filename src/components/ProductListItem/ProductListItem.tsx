import { useNavigate } from 'react-router-dom';
import styles from './productListPosition.module.css';
import Button from '../Button/Button';
import CartIcon from '../icons/CartIcon';
import QuantityButton from '../QuantityButton/QuantityButton';
import { discountedPrice } from '../../utils/functions/discountedPrice';
import { toast } from 'react-toastify';

interface ProductListItemProps {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  stock: number;
  discountPercentage?: number;
  currentQuantity: number;
  isAddedToCart: boolean;
  onAddToCart: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onInputChange: (id: number, value: number) => void;
  disabled?: boolean;
}
const ProductListItem: React.FC<ProductListItemProps> = ({
  id,
  thumbnail,
  title,
  price,
  stock,
  discountPercentage,
  currentQuantity,
  isAddedToCart,
  onAddToCart,
  onIncrement,
  onDecrement,
  onInputChange,
  disabled,
}) => {
  const navigate = useNavigate();
  const priceWithDiscount = discountedPrice(price, discountPercentage ?? 0);

  const handleItemClick = () => {
    navigate(`/product/${id}`);
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (stock === 0) {
      return;
    }
  };

  const handleIncrement = () => {
    if (currentQuantity >= stock) {
      return;
    }
    onIncrement(id);
  };

  const handleCartButtonClick = () => {
    if (stock === 0) {
      return;
    }
    toast.success('Added to cart');
    onAddToCart(id);
  };

  return (
    <article className={styles.listItem} onClick={handleItemClick}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={thumbnail}
          alt={title}
          loading="lazy"
          decoding="async"
          aria-description={title}
        />
        <div className={styles.overlay}>
          <div
            className={styles.showDetails}
            aria-label={`Show details for ${title}`}
          >
            <span className={styles.showDetailsText}>Show details</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.titleWrapper} aria-label={`Product ${title}`}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.price}>${priceWithDiscount}</p>
        </div>
        <div className={styles.buttonWrapper} onClick={handleButtonClick}>
          {isAddedToCart && stock > 0 ? (
            <QuantityButton
              quantity={currentQuantity}
              onIncrement={handleIncrement}
              onDecrement={() => onDecrement(id)}
              onInputChange={value => onInputChange(id, value)}
              incrementDisabled={stock <= currentQuantity}
              disabled={disabled}
              testDecrementButton="decrement-button"
              testIncrementButton="increment-button"
            />
          ) : (
            <Button
              type="button"
              padding="16px 16px"
              onClick={handleCartButtonClick}
              disabled={stock === 0 || disabled}
              aria-label="Add to cart"
              dataTestId="add-to-cart-button"
            >
              <CartIcon
                width={18}
                height={18}
                className={styles.icon}
                aria-description="Cart svg"
              />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};
export default ProductListItem;
