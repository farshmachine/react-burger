import { IngredientList, Ingredient } from './ingredients';

export type Api = {
  createOrder: (i: Ingredient[]) => Promise<{
    name: string;
    order: {
      number: number;
    };
    success: boolean;
  }>;
  getIngredients: () => Promise<{
    data?: IngredientList;
    success: boolean;
    error?: {
      message: string;
    };
  }>;
};
