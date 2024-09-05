import React, { useState } from 'react';
import { useGetUserQuery } from '../../store/slices/authApiSlice';
import { type ErrorType } from '../../types/errorType';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface UserContextValue {
  user: User | undefined;
  userIsLoading: boolean;
  error: ErrorType;
  token: string | null;
  setToken: (token: string | null) => void;
}

export const UserContext = React.createContext<UserContextValue | undefined>(
  undefined
);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const {
    data: user,
    isLoading: userIsLoading,
    error,
  } = useGetUserQuery(undefined, {
    skip: !token,
  });

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  return (
    <UserContext.Provider
      value={{ user, userIsLoading, error, token, setToken: handleSetToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
