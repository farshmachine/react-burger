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
  resetPasswordRequest: (values: { email: string }) => Promise<{
    success: boolean;
    message: string;
  }>;
  resetPassword: (values: { password: string; code: string }) => Promise<{
    success: boolean;
    message: string;
  }>;
  createUser: (values: {
    username: string;
    email: string;
    password: string;
  }) => Promise<{
    success: boolean;
    message: string;
  }>;
};
