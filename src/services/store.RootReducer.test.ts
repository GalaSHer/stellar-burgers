import store, { rootReducer } from './store';

describe('rootReducer', () => {
  test('должен правильно инициализировать состояние', () => {
    const initialStore = store.getState();
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual(initialStore);
  });
});
