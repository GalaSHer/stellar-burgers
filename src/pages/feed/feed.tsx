import { useDispatch, useSelector } from '@services/store';
import { getIngredients } from '@slices/burgerIngredientsSlice/burgerIngredientsSlice';
import { getFeed, getOrdersSelector } from '@slices/feedSlice/feedSlice';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrdersSelector);

  useEffect(() => {
    dispatch(getFeed());
    dispatch(getIngredients());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
