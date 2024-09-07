/* eslint-disable prettier/prettier */
import CartListItem from '../CartListItem/CartListItem';
import styles from './basket.module.css';
import Loader from '../Loader/Loader';
import { useBasket } from './useBasket';

const Basket = () => {
  const {
    cart,
    loading,
    hoveredItem,
    setHoveredItem,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    handleInputChange,
    handleRemoveFromCart,
    allProducts,
    showProductList,
    submittingProducts
  } = useBasket();

  if (loading && !cart) {
    return <Loader />;
  }


  return (
    <section className={styles.basketContainer}>
      <h1 className={styles.title}>My cart</h1>
      {showProductList ? (
        <div className={styles.listsWrapper}>
          <ul className={styles.productContainer}>
            {allProducts.map(product => (
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
                  onAddToCart={() => handleAddToCart(product)}
                  onIncrement={() => handleIncrement(product.id)}
                  onDecrement={() => handleDecrement(product.id)}
                  onInputChange={value => handleInputChange(product.id, value)}
                  onRemoveFromCart={() => handleRemoveFromCart(product.id)}
                  isSubmitting={submittingProducts[product.id]}
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
                ${cart ? +cart.total.toFixed(2) : 0.0}
              </dd>
            </dl>
            <dl className={styles.totalBox}>
              <dt className={styles.total}>Total price</dt>
              <dd className={styles.totalPrice}>
                ${cart ? +cart.discountedTotal.toFixed(2) : 0.0}
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