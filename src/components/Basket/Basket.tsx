import { useState } from 'react';
import CartListItem from '../CartListItem/CartListItem';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
  deleteProduct,
} from '../../store/slices/cartSlice';
import styles from './basket.module.css';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Loader from '../Loader/Loader';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
const Basket = () => {
  const dispatch = useAppDispatch();

  const { cart, loading, error } = useAppSelector(state => state.cart);

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleInputChange = (id: number, value: number) => {
    dispatch(updateQuantity({ id, quantity: value }));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(deleteProduct(id));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <section className={styles.basketContainer}>
      <h1 className={styles.title}>My cart</h1>
      {cart && cart.products.length > 0 ? (
        <div className={styles.listsWrapper}>
          <ul className={styles.productContainer}>
            {cart.products.map(product => (
              <li
                className={styles.cartItem}
                key={product.id}
                onMouseEnter={() => setHoveredItem(product.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <CartListItem
                  id={product.id}
                  imageUrl={product.thumbnail}
                  name={product.title}
                  price={product.price}
                  discountPercentage={product.discountPercentage}
                  quantity={product.quantity}
                  hovered={hoveredItem === product.id}
                  onAddToCart={() =>
                    dispatch(
                      addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        discountPercentage: product.discountPercentage ?? 0,
                        thumbnail: product.thumbnail,
                      })
                    )
                  }
                  onIncrement={() => handleIncrement(product.id)}
                  onDecrement={() => handleDecrement(product.id)}
                  onInputChange={value => handleInputChange(product.id, value)}
                  onRemoveFromCart={() => handleRemoveFromCart(product.id)}
                />
              </li>
            ))}
          </ul>
          <div className={styles.pricingContainer}>
            <dl className={styles.countBox}>
              <dt className={styles.totalCount}>Total count</dt>
              <dd className={styles.count}>{cart?.totalProducts} items</dd>
            </dl>
            <dl className={styles.discountBox}>
              <dt className={styles.noDiscountText}>Price without discount</dt>
              <dd className={styles.noDiscountNumbers}>
                ${+cart?.total.toFixed(2)}
              </dd>
            </dl>
            <dl className={styles.totalBox}>
              <dt className={styles.total}>Total price</dt>
              <dd className={styles.totalPrice}>
                ${+cart?.discountedTotal.toFixed(2)}
              </dd>
            </dl>
          </div>
        </div>
      ) : (
        <p className={styles.emptyText}>No items</p>
      )}
    </section>
  );
};

export default Basket;
