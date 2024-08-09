import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  padding?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  padding = '20px 50px',
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      style={{ padding }}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
};

export default Button;
