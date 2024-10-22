import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '@services/store';
import {
  getIngredients,
  getIngredientsSelector
} from '@slices/burgerIngredientsSlice/burgerIngredientsSlice';
import {
  clearOrder,
  getOrderByNumber,
  getOrderSelector
} from '@slices/orderSlice/orderSlice';
import { useParams } from 'react-router-dom';
import { isModalOpenSelector } from '@slices/modalSlice/modalSlice';
import { OrderInfoWithHeaderUI } from '../ui/order-info/order-info-withHeader';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const orderData = useSelector(getOrderSelector);
  const orderNumber = Number(useParams().number);
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);
  const inModal = useSelector(isModalOpenSelector);

  useEffect(() => {
    if (orderNumber) {
      dispatch(getOrderByNumber(orderNumber));
    }
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
    return () => {
      dispatch(clearOrder());
    };
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }
  if (inModal) {
    return <OrderInfoUI orderInfo={orderInfo} />;
  }

  return <OrderInfoWithHeaderUI orderInfo={orderInfo} />;
};
