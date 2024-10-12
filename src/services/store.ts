import { configureStore } from '@reduxjs/toolkit';
import { reducer as burgerIngredientsReducer } from './slices/burgerIngredientsSlice';
import { reducer as burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { reducer as userProfileReducer } from './slices/userProfileSlice';
import { reducer as feedReducer } from './slices/feedSlice';
import { reducer as ordersReducer } from './slices/profileOrdersSlice';
import { reducer as orderReducer } from './slices/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = {
  ingredients: burgerIngredientsReducer,
  burger: burgerConstructorReducer,
  user: userProfileReducer,
  feed: feedReducer,
  orders: ordersReducer,
  order: orderReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
