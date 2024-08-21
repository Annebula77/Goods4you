import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './header.module.css';
import CartIcon from '../icons/CartIcon';
import Counter from '../Counter/Counter';
import NavigationLink from '../NavigationLink/NavigationLink';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchCart } from '../../store/thunks/cartThunk';
import { useGetUserQuery } from '../../store/slices/AuthApiSlice';

interface HeaderProps {
  isLoginPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoginPage }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token');

  const { data: user, error } = useGetUserQuery(undefined, { skip: !token });

  useEffect(() => {
    if (!isLoginPage) {
      if (!token || error) {
        navigate('/login');
      } else if (user) {
        dispatch(fetchCart({ userId: user.id }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user, error, isLoginPage, navigate]);

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
