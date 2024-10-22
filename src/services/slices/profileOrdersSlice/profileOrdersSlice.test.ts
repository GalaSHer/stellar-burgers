import { configureStore } from '@reduxjs/toolkit';
import { ordersMockData } from '../mockData';
import { getOrders, reducer } from './profileOrdersSlice';

describe('тесты ленты заказов пользователя', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { orders: reducer }
    });
    jest.clearAllMocks();
  });

  test('успешное получение данных', () => {
    const action = getOrders.fulfilled(ordersMockData, 'fulfilled');
    store.dispatch(action);
    const newState = store.getState().orders;

    expect(newState.profileOrders).toEqual(ordersMockData);
    expect(newState.loadingOrders).toBe(false);
    expect(newState.error).toBe(null);
  });

  test('проверка статуса загрузки', () => {
    const action = getOrders.pending('pending');
    store.dispatch(action);
    const newState = store.getState().orders;

    expect(newState.profileOrders).toHaveLength(0);
    expect(newState.loadingOrders).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('проверка ошибки при загрузке', () => {
    const action = getOrders.rejected(new Error('rejected'), 'rejected');
    store.dispatch(action);
    const newState = store.getState().orders;

    expect(newState.profileOrders).toHaveLength(0);
    expect(newState.loadingOrders).toBe(false);
    expect(newState.error).toBe(action.error.message);
  });
});
