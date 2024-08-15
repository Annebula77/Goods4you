import { useState } from 'react';
import CartListItem from '../CartListItem/CartListItem';
import styles from './basket.module.css';
import { useAppSelector } from '../../store/hooks';
const Basket = () => {
  const cart = useAppSelector(state => state.cart.cart);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
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
