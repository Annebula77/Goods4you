import { useState } from 'react';
import cartListMock from '../../utils/mocks/cartListMock';
import CartListItem from '../CartListItem/CartListItem';
import styles from './basket.module.css';
const Basket = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  return (
    <section className={styles.basketContainer}>
      <h1 className={styles.title}>My cart</h1>
      <div className={styles.listsWrapper}>
        <ul className={styles.productContainer}>
          {cartListMock.cartList.map(product => (
            <li
              className={styles.cartItem}
              key={product.id}
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <CartListItem
                id={product.id}
                imageUrl={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                hovered={hoveredItem === product.id}
              />
            </li>
          ))}
        </ul>
        <div className={styles.pricingContainer}>
          <dl className={styles.countBox}>
            <dt className={styles.totalCount}>Total count</dt>
            <dd className={styles.count}>{cartListMock.items} items</dd>
          </dl>
          <dl className={styles.discountBox}>
            <dt className={styles.noDiscountText}>Price without discount</dt>
            <dd className={styles.noDiscountNumbers}>
              ${cartListMock.withoutDiscount}
            </dd>
          </dl>
          <dl className={styles.totalBox}>
            <dt className={styles.total}>Total price</dt>
            <dd className={styles.totalPrice}>${cartListMock.total}</dd>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Basket;
