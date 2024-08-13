import { oneCartUsers } from '../../utils/mocks/profileMock';
import Logo from '../Logo/Logo';
import styles from './header.module.css';
import CartIcon from '../icons/CartIcon';
import Counter from '../Counter/Counter';
import NavigationLink from '../NavigationLink/NavigationLink';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchCart } from '../../store/thunks/cartThunk';

const Header = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // NOTE: In the mock file are listed different users, sorted by cart quantity. Use them for testing purposes (oneCartUsers[1].id is as on Figma)
    dispatch(fetchCart({ userId: oneCartUsers[1].id }));
  }, [dispatch]);

  const cartTotalItems = useAppSelector(
    state => state.cart.cart?.totalQuantity
  );

  return (
    <header className={styles.headerContainer}>
      <Logo aria-label="Header Logo" />
      <nav className={styles.linkContainer} aria-label="Main Navigation">
        <NavigationLink to="#catalog" label="Catalog" />
        <NavigationLink to="#faq" label="FAQ" />
        <NavigationLink to="/cart" label="Cart">
          <div className={styles.cartWrapper}>
            <CartIcon aria-label="Cart Icon" />
            {cartTotalItems ? <Counter quantity={cartTotalItems} /> : null}
          </div>
        </NavigationLink>
        <NavigationLink to="/profile" label={oneCartUsers[1].name} />
      </nav>
    </header>
  );
};
export default Header;
