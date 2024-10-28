import { configureStore } from '@reduxjs/toolkit';
import { mockFeed } from '../mockData';
import { getFeed, reducer } from './feedSlice';

describe('тесты общей ленты заказов', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { feed: reducer }
    });
    jest.clearAllMocks();
  });

  test('успешное получение данных', () => {
    const action = getFeed.fulfilled(mockFeed, 'fulfilled');
    store.dispatch(action);
    const newState = store.getState().feed;

    expect(newState.orders).toEqual(mockFeed.orders);
    expect(newState.total).toEqual(mockFeed.total);
    expect(newState.totalToday).toEqual(mockFeed.totalToday);
    expect(newState.loadingFeed).toBe(false);
  });

  test('проверка статуса загрузки', () => {
    const action = getFeed.pending('pending');
    store.dispatch(action);
    const newState = store.getState().feed;

    expect(newState.orders).toHaveLength(0);
    expect(newState.loadingFeed).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('проверка ошибки при загрузке', () => {
    const action = getFeed.rejected(new Error('rejected'), 'rejected');
    store.dispatch(action);
    const newState = store.getState().feed;

    expect(newState.orders).toHaveLength(0);
    expect(newState.loadingFeed).toBe(false);
    expect(newState.error).toBe(action.error.message);
  });
});
