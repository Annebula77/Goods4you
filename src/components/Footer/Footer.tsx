import Logo from '../Logo/Logo';
import styles from './footer.module.css';
import NavigationLink from '../NavigationLink/NavigationLink';
const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <Logo />
      <nav className={styles.linkContainer}>
        <NavigationLink
          to={window.location.pathname === '/catalog' ? '#catalog' : '/catalog'}
          label="Catalog"
        />
        <NavigationLink to="#faq" label="FAQ" />
      </nav>
    </footer>
  );
};
export default Footer;
