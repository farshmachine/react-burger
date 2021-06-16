import { IngredientList } from '../types/ingredients';
import { requests } from './instance';

export const ingredientsApi = {
  getIngredients: (): Promise<{
    data?: IngredientList;
    success: boolean;
    error?: {
      message: string;
    };
  }> => requests.get('ingredients'),
};
