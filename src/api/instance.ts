import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://norma.nomoreparties.space/api';

const instance = axios.create({
  baseURL: BASE_URL,
});

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: unknown) =>
    instance.post(url, body).then(responseBody),
  put: (url: string, body: unknown) =>
    instance.put(url, body).then(responseBody),
};
