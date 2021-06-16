import { useAppSelector } from './useAppSelector';

export const useUser = () => {
  const {
    name,
    email,
    tokenUpdateDate,
    isTokenUpdated,
    userRequest: { loading, error },
    passwordResetRequested,
  } = useAppSelector((state) => state.user);

  const hasToken = !!localStorage.getItem('refreshToken');

  return {
    user: name,
    email,
    loading,
    error,
    tokenUpdateDate,
    isTokenUpdated,
    hasToken,
    passwordResetRequested,
  };
};
