import { requests } from './instance';

export const orderApi = {
  createOrder: (ingredients: { ingredients: string[] }) =>
    requests.post('/orders', ingredients),
};
