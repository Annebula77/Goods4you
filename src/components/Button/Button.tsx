import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  padding?: string;
  type: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  padding = '20px 50px',
  type,
}) => {
  return (
    <button
      type={type}
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
