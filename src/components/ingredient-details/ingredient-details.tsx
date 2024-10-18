import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '@services/store';
import {
  getIngredients,
  getIngredientsSelector
} from '@slices/burgerIngredientsSlice';
import { isModalOpenSelector } from '@slices/modalSlice';
import { IngredientDetailswithHeaderUI } from '../ui/ingredient-details/ingredient-details-withHeader';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(getIngredientsSelector);
  const inModal = useSelector(isModalOpenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [dispatch]);

  const { id } = useParams();
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  if (inModal) {
    return <IngredientDetailsUI ingredientData={ingredientData} />;
  }

  return <IngredientDetailswithHeaderUI ingredientData={ingredientData} />;
};
