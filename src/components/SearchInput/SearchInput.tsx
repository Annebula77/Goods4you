import styles from './searchInput.module.css';
interface SearchInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
}
const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  value,
  defaultValue,
}) => {
  return (
    <>
      <input
        className={styles.search}
        type="text"
        value={value}
        defaultValue={defaultValue}
        id="search"
        name="searchInput"
        placeholder="Search by title"
        aria-label="Search by title"
        pattern="[a-zA-Z0-9._\-\s]+"
        autoComplete="on"
        maxLength={60}
        onChange={onChange}
      />
    </>
  );
};

export default SearchInput;
