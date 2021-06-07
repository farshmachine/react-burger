import { IngredientList, IngredientsArray } from '../types/ingredients';

export type ValidationStatus = 'FAILURE' | 'SUCCESS';

export const useIngredientDataValidation = (
  data: IngredientList | undefined
) => {
  if (data) {
    const decodedIngredients = IngredientsArray.decode(data);

    return decodedIngredients.caseOf({
      Left: () => ({ valid: false }),
      Right: () => ({ valid: true }),
    });
  }
};
