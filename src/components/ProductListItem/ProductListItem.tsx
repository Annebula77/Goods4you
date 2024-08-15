import { Link } from 'react-router-dom';
import styles from './productListItem.module.css';
import Button from '../Button/Button';
import CartIcon from '../icons/CartIcon';
import QuantityButton from '../QuantityButton/QuantityButton';
import { useEffect, useState } from 'react';
import { discountedPrice } from '../../utils/functions/discountedPrice';

interface ProductListItemProps {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  stock: number;
  discountPercentage?: number;
  onAddToCart?: (id: number, quantity: number) => void;
}
const ProductListItem: React.FC<ProductListItemProps> = ({
  id,
  thumbnail,
  title,
  price,
  stock,
  discountPercentage,
  onAddToCart,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(stock);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleIncrement = () => {
    setCurrentQuantity(prevStock => {
      if (prevStock < stock) {
        return prevStock + 1;
      }
      return prevStock;
    });
  };

  const handleDecrement = () => {
    setCurrentQuantity(prevStock => (prevStock > 1 ? prevStock - 1 : 0));
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

  const priceWithDiscount = discountedPrice(price, discountPercentage ?? 0);

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
          src={thumbnail}
          alt={title}
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
          aria-label={`Product ${title}`}
        >
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.price}>${priceWithDiscount}</p>
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
