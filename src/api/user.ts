import {
  LoginUserResponse,
  RegisterUserData,
  RegisterUserResponse,
  ServerResponse,
  UpdateTokenResponse,
  UpdateUserResponse,
} from '../types/user';
import { requests } from './instance';

export const userApi = {
  register: (data: RegisterUserData): Promise<RegisterUserResponse> =>
    requests.post('/auth/register', data),
  login: (data: {
    email: string;
    password: string;
  }): Promise<LoginUserResponse> => requests.post('/auth/login', data),
  token: (data: { token: string }): Promise<UpdateTokenResponse> => {
    return requests.post('/auth/token', data);
  },
  logout: (data: { token: string }): Promise<ServerResponse> =>
    requests.post('/auth/logout', data),
  update: (data: Partial<RegisterUserData>): Promise<UpdateUserResponse> =>
    requests.patch('/auth/user123', data),
  user: (): Promise<RegisterUserResponse> => requests.get('/auth/user'),
  forgotPassword: (data: { email: string }): Promise<ServerResponse> =>
    requests.post('/password-reset', data),
  resetPassword: (data: {
    password: string;
    token: string;
  }): Promise<ServerResponse> => requests.post('/password-reset/reset', data),
};
