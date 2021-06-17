import { deleteCookie } from './delete-cookie';

export const resetTokens = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
};
