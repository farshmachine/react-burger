import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { IngredientList } from '../../types/ingredients';
import { AppThunk } from '../store';

type OrderSliceState = {
  id?: number;
  name?: string;
  orderRequest: {
    loading: boolean;
    failed: boolean;
    success: boolean;
    error: string;
  };
};

const initialState: OrderSliceState = {
  id: undefined,
  name: '',
  orderRequest: {
    loading: false,
    failed: false,
    success: false,
    error: '',
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(
      state,
      { payload: { id, name } }: PayloadAction<{ id: number; name: string }>
    ) {
      state.id = id;
      state.name = name;
    },
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.orderRequest.loading = payload;
    },
    setRequestFailed(state, { payload }: PayloadAction<string>) {
      state.orderRequest.failed = true;
      state.orderRequest.error = payload;
    },
    setRequestSuccess(state, { payload }: PayloadAction<boolean>) {
      state.orderRequest.success = payload;
    },
  },
});

export const createOrder =
  (items: IngredientList): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    api.createOrder(items).then(({ name, order: { number }, success }) => {
      dispatch(setLoading(false));
      if (success) {
        dispatch(setRequestSuccess(true));
        dispatch(setOrder({ id: number, name }));
      } else {
        dispatch(setRequestFailed('Что-то пошло не так'));
      }
    });
  };

export const { setOrder, setLoading, setRequestFailed, setRequestSuccess } =
  orderSlice.actions;

export default orderSlice.reducer;
