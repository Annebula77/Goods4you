/* eslint-disable prettier/prettier */
import { useState } from 'react';
import CartListItem from '../CartListItem/CartListItem';
import styles from './basket.module.css';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Loader from '../Loader/Loader';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import { updateCart } from '../../store/thunks/updateCartThunk';
import { type CartProductModel } from '../../models/cartSchema';
import { validateCartAndProduct } from '../../utils/functions/validateCartAndUser';
import {
  addRemovedProduct,
} from '../../store/slices/cartSlice';
import { useCartActions } from '../../utils/useCartActions';
const Basket = () => {
  const dispatch = useAppDispatch();

  const {
    addProductToCart,
    incrementProductQuantity,
    decrementProductQuantity,
    updateProductQuantity,
    submittingProducts
  } = useCartActions();

  const { cart, removedProducts, loading, error } = useAppSelector(
    state => state.cart
  );

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleAddToCart = (product: CartProductModel) => {

    addProductToCart(product);

  };

  const handleIncrement = (id: number) => {

    incrementProductQuantity(id);

  };

  const handleDecrement = (id: number) => {

    decrementProductQuantity(id);

  };

  const handleInputChange = (id: number, value: number) => {

    updateProductQuantity(id, value);

  };

  const handleRemoveFromCart = (id: number) => {

    const result = validateCartAndProduct(cart, id);
    if (!result) {

      return;
    }

    const { cart: validatedCart, product } = result;

    const updatedProducts = validatedCart.products.filter(p => p.id !== id);

    dispatch(
      updateCart({
        cartId: validatedCart.id,
        products: { merge: false, products: updatedProducts },
      })
    ).then(response => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(addRemovedProduct({ ...product, quantity: 0 }));
      }

    });
  };


  const allProducts =
    (!cart?.products || cart.products.length === 0) && removedProducts.length > 0
      ? removedProducts
      : [...(cart?.products || []), ...removedProducts];

  const showProductList = (cart && cart.products.length > 0) || removedProducts.length > 0

  if (loading && !cart) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent />;
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
                ${cart ? +cart.total.toFixed(2) : 0.00}
              </dd>
            </dl>
            <dl className={styles.totalBox}>
              <dt className={styles.total}>Total price</dt>
              <dd className={styles.totalPrice}>
                ${cart ? +cart.total.toFixed(2) : 0.00}
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
