import { Link } from 'react-router-dom';
import styles from './logo.module.css';

const Logo = () => {
  return (
    <Link className={styles.logoLink} to="/">
      <h1 className={styles.logo}>Goods4you</h1>
    </Link>
  );
};

export default Logo;
