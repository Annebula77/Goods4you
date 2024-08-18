import { profileMock } from '../../utils/mocks/profileMock';
import Logo from '../Logo/Logo';
import styles from './header.module.css';
import CartIcon from '../icons/CartIcon';
import Counter from '../Counter/Counter';
import NavigationLink from '../NavigationLink/NavigationLink';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <Logo aria-label="Header Logo" />
      <nav className={styles.linkContainer} aria-label="Main Navigation">
        <NavigationLink to="#catalog" label="Catalog" />
        <NavigationLink to="#faq" label="FAQ" />
        <NavigationLink to="/cart" label="Cart">
          <div className={styles.cartWrapper}>
            <CartIcon aria-label="Cart Icon" />
            <Counter quantity={1} />
          </div>
        </NavigationLink>
        <NavigationLink to="/profile" label={profileMock.name} />
      </nav>
    </header>
  );
};
export default Header;
