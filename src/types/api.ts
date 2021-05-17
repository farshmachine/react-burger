import { IngrediendsListType, IngredientType } from './ingredients';

export type Api = {
  createOrder: (i: IngredientType[]) => Promise<{
    name: string;
    order: {
      number: number;
    };
    success: boolean;
  }>;
  getIngredients: () => Promise<{
    data?: IngrediendsListType;
    success: boolean;
    error?: {
      message: string;
    };
  }>;
};
