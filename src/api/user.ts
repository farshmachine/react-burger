import { requests } from './instance';

export const userApi = {
  register: (data: { user: string; email: string; password: string }) =>
    requests.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    requests.post('/auth/login', data),
  token: (data: { token: string }) => requests.post('/auth/token', data),
  logout: (data: { token: string }) => requests.post('/auth/logout', data),
};
