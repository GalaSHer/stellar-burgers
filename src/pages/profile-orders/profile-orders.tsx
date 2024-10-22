import { useDispatch, useSelector } from '@services/store';
import {
  getOrders,
  getProfileOrdersSelector
} from '@slices/profileOrdersSlice/profileOrdersSlice';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getProfileOrdersSelector);

  return <ProfileOrdersUI orders={orders} />;
};
