import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './header.module.css';
import CartIcon from '../icons/CartIcon';
import Counter from '../Counter/Counter';
import NavigationLink from '../NavigationLink/NavigationLink';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchCart } from '../../store/thunks/cartThunk';
import { useGetUserQuery } from '../../store/slices/authApiSlice';
import { setToken } from '../../store/slices/authSlice';

interface HeaderProps {
  isLoginPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoginPage }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  const { data: user, error } = useGetUserQuery(undefined, { skip: !token });
  // NOTE: fix problem with token navigation
  useEffect(() => {
    if (isLoginPage) return;

    if (!token) {
      navigate('/login');
      console.log('Token navigates to login');
      return;
    }

    if (user) {
      dispatch(fetchCart({ userId: user.id }));
      console.log('Fetching cart for user:', user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user, isLoginPage]);
  useEffect(() => {
    if (isLoginPage) return;

    if (error && 'status' in error && error.status === 401) {
      console.log('Unauthorized access, token may be expired or invalid');
      dispatch(setToken(null));
      console.log('Token is removed');
      navigate('/login');
      console.log('Error navigates to login');
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginPage]);

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
            <NavigationLink
              to="/profile"
              label={user ? `${user.firstName} ${user.lastName}` : 'Profile'}
            />
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
