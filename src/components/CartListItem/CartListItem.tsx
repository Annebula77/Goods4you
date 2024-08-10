import { Link } from 'react-router-dom';
import styles from './cartListItem.module.css';
import Button from '../Button/Button';
import CartIcon from '../icons/CartIcon';
import QuantityButton from '../QuantityButton/QuantityButton';
import { useState } from 'react';
import DeleteButton from '../DeleteButton/DeleteButton';

interface CartListItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  onAddToCart?: (id: number, quantity: number) => void;
  onRemoveFromCart?: (id: number) => void;
  hovered?: boolean;
}
const CartListItem: React.FC<CartListItemProps> = ({
  id,
  imageUrl,
  name,
  price,
  quantity,
  onAddToCart,
  onRemoveFromCart,
  hovered,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [isAddedToCart, setIsAddedToCart] = useState(true);
  const [isDeletedFromCart, setIsDeletedFromCart] = useState(false);

  const handleIncrement = () => {
    setCurrentQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setCurrentQuantity(prevQuantity =>
      prevQuantity > 1 ? prevQuantity - 1 : 1
    );
  };

  const handleInputChange = (value: number) => {
    if (value > 0) {
      setCurrentQuantity(value);
    }
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setIsDeletedFromCart(false);
    setCurrentQuantity(1);
    if (onAddToCart) {
      onAddToCart(id, 1);
    }
  };

  const handleDeleteFromCart = () => {
    setIsDeletedFromCart(!isDeletedFromCart);
    setIsAddedToCart(false);
    if (isDeletedFromCart && onRemoveFromCart) {
      onRemoveFromCart(id);
    }
  };

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
              className={`${styles.title} ${isDeletedFromCart ? styles.disabled : ''}`}
            >
              {name}
            </h3>
            <p className={styles.price}>${price}</p>
          </Link>
        </figcaption>
      </figure>
      <div className={styles.actions}>
        {isAddedToCart && !isDeletedFromCart ? (
          <QuantityButton
            quantity={currentQuantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onInputChange={handleInputChange}
            hovered={hovered}
          />
        ) : (
          <Button padding="16px 16px" onClick={handleAddToCart}>
            <CartIcon
              width={18}
              height={18}
              className={styles.icon}
              aria-label="Add to cart"
            />
          </Button>
        )}
        {!isDeletedFromCart && <DeleteButton onClick={handleDeleteFromCart} />}
      </div>
    </article>
  );
};

export default CartListItem;
