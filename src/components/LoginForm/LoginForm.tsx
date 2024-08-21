import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './loginForm.module.css';
import { useLoginMutation } from '../../store/slices/authApiSlice';
import {
  type LoginRequestModel,
  LoginRequestSchema,
} from '../../models/loginSchema';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
const LoginForm = () => {
  const [formData, setFormData] = useState<LoginRequestModel>({
    username: '',
    password: '',
    expiresInMins: 30,
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isNavigateLoading, setIsNavigateLoading] = useState(false);

  const [login, { isLoading, error }] = useLoginMutation();

  const hasFormData =
    formData.username.trim() !== '' && formData.password.trim() !== '';

  useEffect(() => {
    if (!token) {
      return;
    }
    setIsNavigateLoading(true);
    navigate('/');
  }, [token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNavigateLoading(true);

    try {
      LoginRequestSchema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setValidationError(err.errors[0]?.message || 'Invalid input');
        setIsNavigateLoading(false);
        return;
      }
    }

    try {
      const user = await login({
        username: formData.username,
        password: formData.password,
        expiresInMins: formData.expiresInMins,
      }).unwrap();

      localStorage.setItem('token', user.token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setIsNavigateLoading(false);
    }
  };

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
