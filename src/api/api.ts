import { Api } from '../types/api';
import { IngredientType } from '../types/ingredients';
import { BASE_URL } from '../utils/constants';

export const api: Api = {
  getIngredients: () =>
    fetch(`${BASE_URL}/ingredients`)
      .then((res) => {
        if (!res.ok) {
          console.error('Что-то пошло не так');
        }

        return res.json();
      })
      .catch((err) => err),
  createOrder: (ingredients: IngredientType[]) =>
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
        }

        return res.json();
      })
      .catch((err) => err),
};
