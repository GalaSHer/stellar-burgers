import { mockIngredients, mockInitialState, notEmptyState } from '../mockData';
import {
  addIngredientToConstructor,
  clearConstructor,
  deleteIngredient,
  moveIngredient,
  reducer
} from './burgerConstructorSlice';

describe('тесты конструктора бургеров', () => {
  test('добавление булки', () => {
    const action = addIngredientToConstructor(mockIngredients[0]);
    const newState = reducer(mockInitialState, action);

    expect(newState.bun).toEqual(action.payload);
  });

  test('добавление ингредиента', () => {
    const action = addIngredientToConstructor(mockIngredients[1]);
    const newState = reducer(mockInitialState, action);

    expect(newState.ingredients).toContainEqual(action.payload);
  });

  test('удаление ингредиента', () => {
    const action = deleteIngredient('643d69a5c3f7b9001cfa0941');
    const newState = reducer(notEmptyState, action);

    expect(newState.ingredients).not.toContainEqual(action.payload);
  });

  test('перемещение ингредиента в рамках конструктора', () => {
    const action = moveIngredient({ from: 1, direction: 'up' });
    const newState = reducer(notEmptyState, action);

    expect(newState.ingredients[1]).toEqual(notEmptyState.ingredients[0]);
    expect(newState.ingredients[0]).toEqual(notEmptyState.ingredients[1]);
  });

  test('запрет на перемещение ингредиента за рамки конструктора', () => {
    const action = moveIngredient({ from: 0, direction: 'up' });
    const newState = reducer(notEmptyState, action);

    expect(newState.ingredients[0]).toEqual(notEmptyState.ingredients[0]);
  });

  test('очистка конструктора', () => {
    const action = clearConstructor();
    const newState = reducer(notEmptyState, action);

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});
