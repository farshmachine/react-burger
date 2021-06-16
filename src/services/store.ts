import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredients';
import constructorReducer from './constuctor/constructor';
import orderReducer from './order/order';
import userReducer from './user/user';
import { setupAxiosInterceptors } from '../api/instance';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    counstructor: constructorReducer,
    order: orderReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

setupAxiosInterceptors(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
