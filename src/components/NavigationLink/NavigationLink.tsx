import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './navigationLink.module.css';
import { useState, useEffect } from 'react';

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
    event: React.SyntheticEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!to.startsWith('#')) {
      navigate(to);
      return;
    }

    const hash = to.slice(1);

    if (location.pathname !== '/') {
      navigate(`/`, { state: { scrollToHash: hash } });
      return;
    }

    const element = document.getElementById(hash);

    if (!element) {
      navigate(`/`, { state: { scrollToHash: hash } });
      return;
    }

    element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.state && location.state.scrollToHash) {
      const element = document.getElementById(location.state.scrollToHash);
      if (!element) {
        return;
      }
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

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
