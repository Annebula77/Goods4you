import styles from './navButton.module.css';

interface NavButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  padding?: string;
  anchor?: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  children,
  disabled,
  padding = '20px 50px',
  anchor,
}) => {
  const handleClick = () => {
    if (anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  return (
    <button
      className={styles.button}
      onClick={handleClick}
      disabled={disabled}
      style={{ padding }}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
};

export default NavButton;
