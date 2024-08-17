import { Link } from 'react-router-dom';
import styles from './cartListItem.module.css';
import Button from '../Button/Button';
import CartIcon from '../icons/CartIcon';
import QuantityButton from '../QuantityButton/QuantityButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import { discountedPrice } from '../../utils/functions/discountedPrice';

interface CartListItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  discountPercentage?: number;
  quantity: number;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onInputChange: (value: number) => void;
  hovered?: boolean;
}
const CartListItem: React.FC<CartListItemProps> = ({
  id,
  imageUrl,
  name,
  price,
  discountPercentage,
  quantity,
  onAddToCart,
  onIncrement,
  onDecrement,
  onInputChange,
  onRemoveFromCart,
  hovered,
}) => {
  const priceWithDiscount = discountPercentage
    ? discountedPrice(price ?? 0, discountPercentage ?? 0)
    : price;

  const showAddToCartButton = quantity === 0;

  return (
    <article className={styles.listItem}>
      <figure className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={imageUrl}
          alt={name}
          loading="lazy"
          decoding="async"
        />
        <figcaption className={styles.description}>
          <Link
            to={`/product/${id}`}
            className={styles.link}
            aria-label={`Product ${name}`}
          >
            <h3
              className={`${styles.title} ${quantity === 0 ? styles.disabled : ''}`}
            >
              {name}
            </h3>
            <p className={styles.price}>${priceWithDiscount}</p>
          </Link>
        </figcaption>
      </figure>
      <div className={styles.actions}>
        {quantity >= 1 ? (
          <QuantityButton
            quantity={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onInputChange={onInputChange}
            hovered={hovered}
          />
        ) : (
          <Button padding="16px 16px" onClick={onAddToCart}>
            <CartIcon
              width={18}
              height={18}
              className={styles.icon}
              aria-label="Add to cart"
            />
          </Button>
        )}
        {!showAddToCartButton && <DeleteButton onClick={onRemoveFromCart} />}
      </div>
    </article>
  );
};

export default CartListItem;
