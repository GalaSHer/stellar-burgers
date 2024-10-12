import { FC, memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '@services/store';
import {
  addIngredientToConstructor,
  getBurgerSelector
} from '@slices/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const burger = useSelector(getBurgerSelector);
    const [currentCount, setCurrentCount] = useState(count);

    const getIngredientCount = () => {
      if (ingredient.type === 'bun') {
        return burger.bun && burger.bun._id === ingredient._id ? 1 : 0;
      } else
        return burger.ingredients.filter((item) => item._id === ingredient._id)
          .length;
    };

    useEffect(() => {
      setCurrentCount(getIngredientCount() || count);
    }, [burger.ingredients, burger.bun, count]);

    const handleAdd = () => {
      dispatch(addIngredientToConstructor(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={currentCount}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
