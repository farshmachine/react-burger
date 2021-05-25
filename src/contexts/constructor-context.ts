import React, { Dispatch, SetStateAction } from 'react';
import { IngrediendsListType, IngredientType } from '../types/ingredients';

export const ConstructorContext =
  React.createContext<
    | Dispatch<
        SetStateAction<{
          bun: IngredientType | undefined;
          other: IngrediendsListType;
        }>
      >
    | undefined
  >(undefined);
