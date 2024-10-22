import { reducer, openModal, closeModal } from './modalSlice';

describe('тесты статуса модального окна', () => {
  const mockInitialState = {
    modalIsOpen: false
  };

  test('открытие модального окна', () => {
    const newState = reducer(mockInitialState, openModal());
    expect(newState.modalIsOpen).toBe(true);
  });

  test('закрытие модального окна', () => {
    const openedState = reducer(mockInitialState, openModal());
    const newState = reducer(openedState, closeModal());
    expect(newState.modalIsOpen).toBe(false);
  });
});
