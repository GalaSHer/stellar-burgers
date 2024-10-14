import { nanoid, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerState = {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
};

const initialState: TBurgerState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredientToConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (item: TIngredient) => ({
        payload: { ...item, id: nanoid() }
      })
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
      if (state.bun?.id === action.payload) {
        state.bun = null;
      }
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; direction: 'up' | 'down' }>
    ) => {
      const { from, direction } = action.payload;
      const to = direction === 'up' ? from - 1 : from + 1;
      if (to < 0 || to >= state.ingredients.length) {
        return;
      }
      const [movedIngredient] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, movedIngredient);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getBurgerSelector: (state) => state
  }
});

export const { reducer } = burgerConstructorSlice;
export const {
  addIngredientToConstructor,
  deleteIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
export const { getBurgerSelector } = burgerConstructorSlice.selectors;
