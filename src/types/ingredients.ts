import { Codec, string, array, GetType, number } from 'purify-ts/Codec';

const Ingredient = Codec.interface({
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
});

export type IngredientType = GetType<typeof Ingredient>;

export const IngredientsList = array(Ingredient);

export type IngrediendsListType = GetType<typeof IngredientsList>;
