import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@services/store';
import { getUserDataSelector } from '@slices/userProfileSlice';

export const AppHeader: FC = () => {
  const user = useSelector(getUserDataSelector).user;
  return <AppHeaderUI userName={user.name} />;
};
