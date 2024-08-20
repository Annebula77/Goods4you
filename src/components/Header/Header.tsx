import { oneCartUsers } from '../../utils/mocks/profileMock';
import Logo from '../Logo/Logo';
import styles from './header.module.css';
import CartIcon from '../icons/CartIcon';
import Counter from '../Counter/Counter';
import NavigationLink from '../NavigationLink/NavigationLink';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchCart } from '../../store/thunks/cartThunk';

interface HeaderProps {
  isLoginPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoginPage }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoginPage) {
      dispatch(fetchCart({ userId: oneCartUsers[1].id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartTotalItems = useAppSelector(
    state => state.cart.cart?.totalQuantity
  );

  return (
    <header className={styles.headerContainer}>
      <Logo aria-label="Header Logo" />
      <nav className={styles.linkContainer} aria-label="Main Navigation">
        {!isLoginPage && (
          <>
            <NavigationLink to="#catalog" label="Catalog" />
            <NavigationLink to="#faq" label="FAQ" />
            <NavigationLink to="/cart" label="Cart">
              <div className={styles.cartWrapper}>
                <CartIcon aria-label="Cart Button" />
                {cartTotalItems ? <Counter quantity={cartTotalItems} /> : null}
              </div>
            </NavigationLink>
            <NavigationLink to="/profile" label={oneCartUsers[1].name} />
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
