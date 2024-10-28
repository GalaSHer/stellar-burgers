import { configureStore } from '@reduxjs/toolkit';
import { mockIngredients } from '../mockData';
import { getIngredients, reducer } from './burgerIngredientsSlice';

describe('тесты получения массива ингредиентов', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { ingredients: reducer }
    });
    jest.clearAllMocks();
  });

  test('успешное получение данных', () => {
    const action = getIngredients.fulfilled(mockIngredients, 'fulfilled');
    store.dispatch(action);
    const newState = store.getState().ingredients;

    expect(newState.ingredients).toEqual(mockIngredients);
    expect(newState.loadingIngredients).toBe(false);
    expect(newState.error).toBe(null);
  });

  test('проверка статуса загрузки', () => {
    const action = getIngredients.pending('pending');
    store.dispatch(action);
    const newState = store.getState().ingredients;

    expect(newState.ingredients).toHaveLength(0);
    expect(newState.loadingIngredients).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('проверка ошибки при загрузке', () => {
    const action = getIngredients.rejected(new Error('rejected'), 'rejected');
    store.dispatch(action);
    const newState = store.getState().ingredients;

    expect(newState.ingredients).toHaveLength(0);
    expect(newState.loadingIngredients).toBe(false);
    expect(newState.error).toBe(action.error.message);
  });
});
