import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredients';
import constructorReducer from './constuctor/constructor';
import orderReducer from './order/order';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    counstructor: constructorReducer,
    order: orderReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
