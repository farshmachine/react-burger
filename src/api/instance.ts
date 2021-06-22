import axios, { AxiosResponse } from 'axios';
import { AppDispatch } from '../services/store';
import { refreshToken } from '../services/user/user';
import { getCookie } from '../utils/get-cookie';

const BASE_URL = 'https://norma.nomoreparties.space/api';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const setupAxiosInterceptors = (dispatch: AppDispatch) => {
  instance.interceptors.request.use((config) => {
    const { method, url } = config;
    if (method === 'patch' || (method === 'get' && url === '/auth/user')) {
      config.headers.authorization = getCookie('accessToken');
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (err) => {
      const originalRequest = err.config;
      const {
        response: {
          data: { message, success },
        },
      } = err;

      if (!success && message === 'jwt expired' && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = localStorage.getItem('refreshToken');
        if (token) {
          dispatch(refreshToken());
          originalRequest.headers.authorization = getCookie('accessToken');
          return originalRequest;
        }
      }

      return Promise.reject(err);
    }
  );
};

const responseBody = (response: AxiosResponse) => response.data;
const responseError = ({ response }: any) => {
  if (response.status === 404) {
    return {
      message: 'Запрос не найден',
      success: false,
    };
  }

  return response.data;
};

export const requests = {
  get: (url: string) =>
    instance.get(url).then(responseBody).catch(responseError),
  post: (url: string, body: unknown) =>
    instance.post(url, body).then(responseBody).catch(responseError),
  put: (url: string, body: unknown) =>
    instance.put(url, body).then(responseBody).catch(responseError),
  patch: (url: string, body: unknown) =>
    instance.patch(url, body).then(responseBody).catch(responseError),
};
