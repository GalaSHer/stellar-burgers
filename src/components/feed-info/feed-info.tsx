import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '@services/store';
import {
  getOrdersSelector,
  getTotalSelector,
  getTotalTodaySelector
} from '@slices/feedSlice/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(getOrdersSelector);
  const feed = {
    total: useSelector(getTotalSelector),
    totalToday: useSelector(getTotalTodaySelector)
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
