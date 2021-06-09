import { Api } from '../types/api';
import { BASE_URL } from '../utils/constants';

export const api: Api = {
  getIngredients: () =>
    fetch(`${BASE_URL}/ingredients`)
      .then((res) => {
        if (!res.ok) {
          console.error('Что-то пошло не так');
          return Promise.reject(res.status);
        }

        return res.json();
      })
      .catch((err) => err),
  createOrder: (ingredients) =>
    fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: ingredients.map((e) => e?._id),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error('Что-то пошло не так');
          return Promise.reject(res.status);
        }

        return res.json();
      })
      .catch((err) => err),
  resetPasswordRequest: (_values) =>
    fetch(`${BASE_URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error('Что-то пошло не так');
          return Promise.reject(res.status);
        }

        return res.json();
      })
      .catch((err) => err),
  resetPassword: (_values) =>
    fetch(`${BASE_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error('Что-то пошло не так');
          return Promise.reject(res.status);
        }

        return res.json();
      })
      .catch((err) => err),
  createUser: ({ username: name, email, password }) =>
    fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error('Что-то пошло не так');
          return Promise.reject(res.status);
        }

        return res.json();
      })
      .catch((err) => err),
};
