import { Link } from 'react-router-dom';
import styles from './productListItem.module.css';
import Button from '../Button/Button';
import CartIcon from '../icons/CartIcon';
import QuantityButton from '../QuantityButton/QuantityButton';
import { useEffect, useState } from 'react';

interface ProductListItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  onAddToCart?: (id: number, quantity: number) => void;
}
const ProductListItem: React.FC<ProductListItemProps> = ({
  id,
  imageUrl,
  name,
  price,
  quantity,
  onAddToCart,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleIncrement = () => {
    setCurrentQuantity(prevQuantity => {
      if (prevQuantity < quantity) {
        return prevQuantity + 1;
      }
      return prevQuantity;
    });
  };

  const handleDecrement = () => {
    setCurrentQuantity(prevQuantity =>
      prevQuantity > 1 ? prevQuantity - 1 : 0
    );
  };

  const handleInputChange = (value: number) => {
    if (value > 0) {
      setCurrentQuantity(value);
    }
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setCurrentQuantity(1);
    if (!onAddToCart) return;
    onAddToCart(id, 1);
  };

  // NOTE: For testing purposes (delete later)
  useEffect(() => {
    if (id === 6) {
      handleAddToCart();
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (currentQuantity === 0) {
      setIsAddedToCart(false);
    }
  }, [currentQuantity]);

  return (
    <article className={styles.listItem}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={imageUrl}
          alt={name}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.overlay}>
          <Link
            to={`/product/${id}`}
            className={styles.showDetailsLink}
            aria-label={`Show details for ${name}`}
          >
            <span className={styles.showDetailsText}>Show details</span>
          </Link>
        </div>
      </div>

      <div className={styles.actions}>
        <Link
          to={`/product/${id}`}
          className={styles.link}
          aria-label={`Product ${name}`}
        >
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.price}>${price}</p>
        </Link>
        {isAddedToCart ? (
          <QuantityButton
            quantity={currentQuantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onInputChange={handleInputChange}
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
      </div>
    </article>
  );
};
export default ProductListItem;
