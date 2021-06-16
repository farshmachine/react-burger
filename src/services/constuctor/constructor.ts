import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { Ingredient } from '../../types/ingredients';

type ConstructorSliceState = {
  bun?: Ingredient & { id: string };
  main: (Ingredient & { id: string })[];
  totalPrice: number;
};

const initialState: ConstructorSliceState = {
  bun: undefined,
  main: [],
  totalPrice: 0,
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient(state, { payload }: PayloadAction<Ingredient>) {
      if (payload.type === 'bun') {
        if (state.bun) {
          state.totalPrice -= state.bun.price * 2;
        }

        state.bun = { ...payload, id: v4() };
        state.totalPrice += payload.price * 2;
      } else {
        state.main.push({ ...payload, id: v4() });
        state.totalPrice += payload.price;
      }
    },
    removeIngredient(state, { payload }: PayloadAction<Ingredient>) {
      if (payload.type === 'bun') {
        state.bun = undefined;
        state.totalPrice -= payload.price * 2;
      } else {
        const deleted = state.main.findIndex((el) => el._id === payload._id);
        state.main = [
          ...state.main.slice(0, deleted),
          ...state.main.slice(deleted + 1),
        ];
        state.totalPrice -= payload.price;
      }
    },
    reorderIngredients(
      state,
      { payload }: PayloadAction<(Ingredient & { id: string })[]>
    ) {
      state.main = payload;
    },
    clearConstructor() {
      return initialState;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  reorderIngredients,
  clearConstructor,
} = constructorSlice.actions;

export default constructorSlice.reducer;
