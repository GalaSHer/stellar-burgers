import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearConstructor,
  getBurgerSelector
} from '@slices/burgerConstructorSlice/burgerConstructorSlice';
import { useDispatch, useSelector } from '@services/store';
import {
  clearOrder,
  makeOrder,
  getOrderSelector,
  orderLoadingSelector
} from '@slices/orderSlice/orderSlice';
import { useNavigate } from 'react-router-dom';
import { isAuthUserSelector } from '@slices/userProfileSlice/userProfileSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthUser = useSelector(isAuthUserSelector);

  const constructorItems = useSelector(getBurgerSelector);

  const orderRequest = useSelector(orderLoadingSelector);

  const orderModalData = useSelector(getOrderSelector);

  const onOrderClick = () => {
    if (!isAuthUser) {
      return navigate('/login', { replace: true });
    }
    if (!constructorItems.bun || orderRequest) return;

    const ingredientsIds = constructorItems.ingredients.map(
      (item: TConstructorIngredient) => item._id
    );
    dispatch(
      makeOrder([
        constructorItems.bun._id,
        ...ingredientsIds,
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
