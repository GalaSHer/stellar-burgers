import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const makeOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  order: null,
  loading: false,
  error: null
};

// вспомогательные функции-обработчики
const handlePending = (state: TOrderState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state: TOrderState, action: any) => {
  state.loading = false;
  state.error = action.payload || 'Ошибка';
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: () => initialState
  },
  selectors: {
    getOrderSelector: (state) => state.order,
    orderLoadingSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, handlePending)
      .addCase(makeOrder.rejected, handleRejected)
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })

      .addCase(getOrderByNumber.pending, handlePending)
      .addCase(getOrderByNumber.rejected, handleRejected)
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
      });
  }
});

export const { reducer } = orderSlice;
export const { clearOrder } = orderSlice.actions;
export const { getOrderSelector, orderLoadingSelector } = orderSlice.selectors;
