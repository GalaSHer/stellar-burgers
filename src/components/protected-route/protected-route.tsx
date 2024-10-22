import { useSelector } from '@services/store';
import { getUserDataSelector } from '@slices/userProfileSlice/userProfileSlice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isLoading = useSelector(getUserDataSelector).loading;
  const userAuth = useSelector(getUserDataSelector).isAuthChecked;
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !userAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && userAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
