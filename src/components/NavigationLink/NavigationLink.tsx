import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentPage = location.pathname === to;

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (to.startsWith('#')) {
      const hash = to.slice(1);

      if (location.pathname === '/') {
        const element = document.getElementById(hash);

        if (element) {
          event.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        event.preventDefault();
        if (hash === 'catalog') {
          navigate('/');
        } else {
          navigate(`/${hash}`);
        }
      }
    } else {
      event.preventDefault();
      navigate(to);
    }
  };

  return (
    <Link
      to={to}
      className={styles.navigationLink}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={label}
      aria-current={isCurrentPage ? 'page' : undefined}
      onClick={handleClick}
    >
      <span className={isHovered ? styles.hover : styles.navigationLink}>
        {label}
      </span>
      {children}
    </Link>
  );
};

export default NavigationLink;
