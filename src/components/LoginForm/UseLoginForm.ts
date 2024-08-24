import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../store/slices/authApiSlice';
import {
  type LoginRequestModel,
  LoginRequestSchema,
} from '../../models/loginSchema';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginRequestModel>({
    username: '',
    password: '',
    expiresInMins: 30,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(state => state.auth.token);

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isNavigateLoading, setIsNavigateLoading] = useState(false);

  const [login, { isLoading, error }] = useLoginMutation();

  const hasFormData =
    formData.username.trim() !== '' && formData.password.trim() !== '';

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
      console.log('Login success:', user);
      dispatch(setToken(user.token));
      navigate('/');
      console.log('Login navigate');
    } catch (error) {
      console.error('Login failed:', error);
      setIsNavigateLoading(false);
    }
  };
  useEffect(() => {
    if (!token) {
      return;
    }
    setIsNavigateLoading(true);
    navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    isNavigateLoading,
    validationError,
    isLoading,
    error,
    hasFormData,
    handleChange,
    handleSubmit,
  };
};
