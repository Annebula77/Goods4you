import { useState } from 'react';
import Button from '../Button/Button';
import styles from './loginForm.module.css';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const hasFormData =
    formData.login.trim() !== '' && formData.password.trim() !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className={styles.formContainer}>
      <h1 className={styles.title}>Sign in</h1>
      <form className={styles.innerContainer} autoComplete="off">
        <input
          className={styles.inputStyles}
          type="text"
          id="login"
          name="login"
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
          placeholder="Password"
          aria-label="password"
          pattern="[a-zA-Z0-9._\-\s]+"
          maxLength={60}
          autoFocus
          autoComplete="new-password"
          onChange={handleChange}
        />
        <Button padding="21px 65px 18px" type="submit" disabled={!hasFormData}>
          Sign in
        </Button>
      </form>
    </section>
  );
};

export default LoginForm;
