import { IngredientType } from '../types/ingredients';

export const orderApi = {
  createOrder: (ingredients: IngredientType[]) =>
    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        ingredients: ingredients.map((e) => e?._id),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
};
