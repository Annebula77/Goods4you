import Logo from '../Logo/Logo';
import styles from './footer.module.css';
import NavigationLink from '../NavigationLink/NavigationLink';
const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <Logo aria-label="Footer Logo" />
      <nav className={styles.linkContainer} aria-label="Footer Navigation">
        <NavigationLink to="#catalog" label="Catalog" />
        <NavigationLink to="#faq" label="FAQ" />
      </nav>
    </footer>
  );
};
export default Footer;
