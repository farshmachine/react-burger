import { ingredientsApi } from '../api/ingredients';
import { orderApi } from '../api/order';
import { userApi } from '../api/user';

export type Api = {
  ingredientsApi: typeof ingredientsApi;
  orderApi: typeof orderApi;
  userApi: typeof userApi;
};
