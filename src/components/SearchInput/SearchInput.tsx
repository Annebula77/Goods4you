import styles from './searchInput.module.css';

const SearchInput = () => {
  return (
    <div>
      <input
        className={styles.search}
        type="text"
        id="search"
        name="searchInput"
        placeholder="Search by title"
        aria-label="Search by title"
        pattern="^[a-zA-Z0-9._-]+$"
        autoComplete="on"
        maxLength={60}
      />
    </div>
  );
};

export default SearchInput;
