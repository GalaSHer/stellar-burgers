import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

export type TIngredientsState = {
  ingredients: Array<TIngredient>;
  loadingIngredients: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loadingIngredients: false,
  error: null
};

const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    ingredientsLoadingSelector: (state) => state.loadingIngredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loadingIngredients = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loadingIngredients = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loadingIngredients = false;
        state.ingredients = action.payload;
      });
  }
});

export const { reducer } = burgerIngredientsSlice;
export const { getIngredientsSelector, ingredientsLoadingSelector } =
  burgerIngredientsSlice.selectors;
