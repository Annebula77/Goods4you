import { Link } from 'react-router-dom';
import styles from './navigationLink.module.css';
import { useState } from 'react';

interface NavigationLinkProps {
  children?: React.ReactNode;
  to: string;
  label: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  to,
  label,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      className={styles.navigationLink}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={isHovered ? styles.hover : styles.navigationLink}>
        {label}
      </span>
      {children}
    </Link>
  );
};

export default NavigationLink;
