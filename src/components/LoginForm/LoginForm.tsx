import Button from '../Button/Button';
import styles from './loginForm.module.css';
import Loader from '../Loader/Loader';
import { useLoginForm } from './UseLoginForm';
const LoginForm = () => {
  const {
    isNavigateLoading,
    validationError,
    isLoading,
    error,
    hasFormData,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  if (isNavigateLoading || isLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.formContainer}>
      <h1 className={styles.title}>Sign in</h1>
      <form
        className={styles.innerContainer}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          className={styles.inputStyles}
          type="text"
          id="username"
          name="username"
          defaultValue="oliviaw"
          placeholder="Login"
          aria-label="Login"
          pattern="[a-zA-Z0-9._\-\s]+"
          maxLength={60}
          autoFocus
          autoComplete="new-username"
          onChange={handleChange}
        />
        <input
          className={styles.inputStyles}
          type="password"
          id="password"
          name="password"
          defaultValue="oliviawpass"
          placeholder="Password"
          aria-label="password"
          pattern="[a-zA-Z0-9._\-\s]+"
          maxLength={60}
          autoFocus
          autoComplete="new-password"
          onChange={handleChange}
        />
        <Button
          padding="21px 65px 18px"
          type="submit"
          disabled={!hasFormData || isLoading}
        >
          Sign in
        </Button>
        {validationError && (
          <p className={styles.errorText}>{validationError}</p>
        )}
        {error && (
          <p className={styles.errorText}>Login failed. Please try again.</p>
        )}
      </form>
    </section>
  );
};

export default LoginForm;
