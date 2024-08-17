import { Link } from 'react-router-dom';
import styles from './productListItem.module.css';
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
}) => {
  const priceWithDiscount = discountedPrice(price, discountPercentage ?? 0);

  const handleIncrement = () => {
    if (currentQuantity >= stock) {
      toast.info('You have reached the maximum quantity');
      return;
    }
    onIncrement(id);
  };

  return (
    <article className={styles.listItem}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={thumbnail}
          alt={title}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.overlay}>
          <Link
            to={`/product/${id}`}
            className={styles.showDetailsLink}
            aria-label={`Show details for ${title}`}
          >
            <span className={styles.showDetailsText}>Show details</span>
          </Link>
        </div>
      </div>

      <div className={styles.actions}>
        <Link
          to={`/product/${id}`}
          className={styles.link}
          aria-label={`Product ${title}`}
        >
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.price}>${priceWithDiscount}</p>
        </Link>
        {isAddedToCart ? (
          <QuantityButton
            quantity={currentQuantity}
            onIncrement={handleIncrement}
            onDecrement={() => onDecrement(id)}
            onInputChange={value => onInputChange(id, value)}
          />
        ) : (
          <Button padding="16px 16px" onClick={() => onAddToCart(id)}>
            <CartIcon
              width={18}
              height={18}
              className={styles.icon}
              aria-label="Add to cart"
            />
          </Button>
        )}
      </div>
    </article>
  );
};
export default ProductListItem;
