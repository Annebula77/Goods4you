import styles from './deleteButton.module.css';

interface DeleteButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      <span className={styles.buttonText}>Delete</span>
    </button>
  );
};

export default DeleteButton;
