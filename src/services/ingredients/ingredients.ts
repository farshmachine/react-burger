import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { api } from '../../api/api';
import { IngredientList, Ingredient } from '../../types/ingredients';
import { AppThunk } from '../store';

type IngredientsSliceState = {
  ingredients?: IngredientList;
  currentIngredient?: Ingredient;
  ingredientsRequest: {
    loading: boolean;
    failed: boolean;
    success: boolean;
    error: string;
  };
};

const initialState: IngredientsSliceState = {
  ingredients: undefined,
  currentIngredient: undefined,
  ingredientsRequest: {
    loading: false,
    failed: false,
    success: false,
    error: '',
  },
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient(state, { payload }: PayloadAction<Ingredient>) {
      state.currentIngredient = payload;
      return;
    },
    setIngredients(state, { payload }: PayloadAction<Ingredient[]>) {
      state.ingredients = payload;
    },
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.ingredientsRequest.loading = payload;
    },
    setRequestFailed(state, { payload }: PayloadAction<string>) {
      state.ingredientsRequest.failed = true;
      state.ingredientsRequest.error = payload;
    },
    setRequestSuccess(state, { payload }: PayloadAction<boolean>) {
      state.ingredientsRequest.success = payload;
    },
  },
});

export const getIngredients = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  api.getIngredients().then(({ data, success, error }) => {
    dispatch(setLoading(false));
    if (success && data) {
      dispatch(setRequestSuccess(true));
      let res = data.map((el) => ({
        ...el,
        uuid: v4(),
      }));
      dispatch(setIngredients(res));
    }
    if (error) {
      dispatch(setRequestFailed(error.message));
    }
  });
};

export const {
  setCurrentIngredient,
  setLoading,
  setIngredients,
  setRequestFailed,
  setRequestSuccess,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
