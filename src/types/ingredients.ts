import { Codec, string, array, GetType, number } from 'purify-ts/Codec';

const ingredient = Codec.interface({
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
  uuid: string,
});

export type Ingredient = GetType<typeof ingredient>;

export const IngredientsArray = array(ingredient);

export type IngredientList = GetType<typeof IngredientsArray>;

export type IngredientType = 'bun' | 'main' | 'sauce';
