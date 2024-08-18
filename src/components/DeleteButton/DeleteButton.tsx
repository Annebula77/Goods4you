import styles from './deleteButton.module.css';

interface DeleteButtonProps {
  onClick?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.buttonText}>Delete</span>
    </button>
  );
};

export default DeleteButton;
