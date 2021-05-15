import { IngrediendsListType, IngredientsList } from '../types/ingredients';

export type ValidationStatus = 'FAILURE' | 'SUCCESS';

export const useIngredientDataValidation = (
  data: IngrediendsListType | undefined
) => {
  if (data) {
    const decodedIngredients = IngredientsList.decode(data);

    return decodedIngredients.caseOf({
      Left: () => ({ type: 'FAILURE' }),
      Right: () => ({ type: 'SUCCESS' }),
    });
  }
};
