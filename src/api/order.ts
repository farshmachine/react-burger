import { IngredientList } from '../types/ingredients';
import { requests } from './instance';

export const orderApi = {
  createOrder: (ingredients: IngredientList) =>
    requests.post('/orders', ingredients),
};
