import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeed = createAsyncThunk(
  'feed/get',
  async () => await getFeedsApi()
);

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loadingFeed: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loadingFeed: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getTotalSelector: (state) => state.total,
    getTotalTodaySelector: (state) => state.totalToday,
    feedLoadingSelector: (state) => state.loadingFeed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loadingFeed = true;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loadingFeed = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loadingFeed = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const { reducer } = feedSlice;
export const {
  getOrdersSelector,
  getTotalSelector,
  getTotalTodaySelector,
  feedLoadingSelector
} = feedSlice.selectors;
