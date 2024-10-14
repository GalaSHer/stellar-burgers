import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk(
  'orders/getUserOrders',
  async () => await getOrdersApi()
);

type TProfileOrdersState = {
  profileOrders: TOrder[];
  loadingOrders: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  profileOrders: [],
  loadingOrders: false,
  error: null
};

const profileOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getProfileOrdersSelector: (state) => state.profileOrders,
    profileOrdersLoadingSelector: (state) => state.loadingOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loadingOrders = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loadingOrders = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.profileOrders = action.payload;
      });
  }
});

export const { reducer } = profileOrdersSlice;
export const { getProfileOrdersSelector, profileOrdersLoadingSelector } =
  profileOrdersSlice.selectors;
