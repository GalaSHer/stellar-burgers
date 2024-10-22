import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as burgerIngredientsReducer } from './slices/burgerIngredientsSlice/burgerIngredientsSlice';
import { reducer as burgerConstructorReducer } from './slices/burgerConstructorSlice/burgerConstructorSlice';
import { reducer as userProfileReducer } from './slices/userProfileSlice/userProfileSlice';
import { reducer as feedReducer } from './slices/feedSlice/feedSlice';
import { reducer as ordersReducer } from './slices/profileOrdersSlice/profileOrdersSlice';
import { reducer as orderReducer } from './slices/orderSlice/orderSlice';
import { reducer as modalReducer } from './slices/modalSlice/modalSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  burger: burgerConstructorReducer,
  user: userProfileReducer,
  feed: feedReducer,
  orders: ordersReducer,
  order: orderReducer,
  modal: modalReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
