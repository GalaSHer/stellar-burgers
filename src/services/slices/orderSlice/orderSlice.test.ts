import { makeOrder, getOrderByNumber, reducer } from './orderSlice';

describe('тесты на проверку заказа', () => {
  const initialState = {
    order: null,
    loading: false,
    error: null
  };

  test('успешно сделан заказ', () => {
    const action = {
      type: makeOrder.fulfilled.type,
      payload: { order: { id: 1 } },
      meta: { requestId: '123', arg: null, requestStatus: 'fulfilled' }
    };
    const newState = reducer(initialState, action);
    expect(newState.order).toEqual(action.payload.order);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });

  test('проверка статуса загрузки', () => {
    const action = {
      type: makeOrder.pending.type,
      payload: { order: { id: 1 } },
      meta: { requestId: '123', arg: null, requestStatus: 'pending' }
    };
    const newState = reducer(initialState, action);

    expect(newState.order).toBeNull();
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('проверка ошибки при загрузке', () => {
    const action = {
      type: makeOrder.rejected.type,
      error: { message: 'Ошибка' },
      meta: {
        requestId: '123',
        arg: null,
        requestStatus: 'rejected'
      }
    };
    const newState = reducer(initialState, action);

    expect(newState.order).toBeNull();
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(action.error.message);
  });
});

describe('тесты на проверку получения заказа по номеру', () => {
  const initialState = {
    order: null,
    loading: false,
    error: null
  };

  test('успешно получен заказ', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [{ number: 1 }] },
      meta: { requestId: '123', arg: null, requestStatus: 'fulfilled' }
    };
    const newState = reducer(initialState, action);

    expect(newState.order).toEqual(action.payload.orders[0]);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });

  test('проверка статуса загрузки', () => {
    const action = {
      type: getOrderByNumber.pending.type,
      payload: { orders: [{ number: 1 }] },
      meta: { requestId: '123', arg: null, requestStatus: 'pending' }
    };
    const newState = reducer(initialState, action);

    expect(newState.order).toBeNull();
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('проверка ошибки при загрузке', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Ошибка' },
      meta: {
        requestId: '123',
        arg: null,
        requestStatus: 'rejected'
      }
    };
    const newState = reducer(initialState, action);

    expect(newState.order).toBeNull();
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(action.error.message);
  });
});
