import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './header.module.css';
import CartIcon from '../icons/CartIcon';
import Counter from '../Counter/Counter';
import NavigationLink from '../NavigationLink/NavigationLink';
import { useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { useGetUserQuery } from '../../store/slices/authApiSlice';

interface HeaderProps {
  isLoginPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoginPage }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { data: user } = useGetUserQuery(undefined, { skip: !token });

  useEffect(() => {
    if (isLoginPage) return;

    if (!token) {
      navigate('/login');
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isLoginPage]);

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
