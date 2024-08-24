import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  padding?: string;
  type: 'button' | 'submit' | 'reset';
  dataTestId?: string;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  padding = '20px 50px',
  type,
  dataTestId,
  ariaLabel,
}) => {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      style={{ padding }}
      data-testid={dataTestId}
      aria-label={ariaLabel}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
};

export default Button;
