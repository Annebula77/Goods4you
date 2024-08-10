import { Link, useLocation } from 'react-router-dom';
import styles from './logo.module.css';

const Logo = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && (
        <Link className={styles.logoLink} to="/">
          <h1 className={styles.logo}>Goods4you</h1>
        </Link>
      )}
      {location.pathname === '/' && <h1 className={styles.logo}>Goods4you</h1>}
    </>
  );
};

export default Logo;
