import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const priceWithDiscount = discountPercentage
    ? discountedPrice(price ?? 0, discountPercentage ?? 0)
    : price;

  const showAddToCartButton = quantity === 0;

  const handleItemClick = () => {
    navigate(`/product/${id}`);
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <article className={styles.listItem} onClick={handleItemClick}>
      <figure className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={imageUrl}
          alt={name}
          loading="lazy"
          decoding="async"
        />
        <figcaption className={styles.description}>
          <div className={styles.titleWrapper}>
            <h3
              className={`${styles.title} ${quantity === 0 ? styles.disabled : ''}`}
            >
              {name}
            </h3>
            <p
              className={`${styles.price} ${quantity === 0 ? styles.disabled : ''}`}
            >
              ${priceWithDiscount}
            </p>
          </div>
        </figcaption>
      </figure>
      <div className={styles.actions} onClick={handleButtonClick}>
        {quantity >= 1 ? (
          <QuantityButton
            quantity={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onInputChange={onInputChange}
            hovered={hovered}
          />
        ) : (
          <Button padding="16px 16px" onClick={onAddToCart} type="button">
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
