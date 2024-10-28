import { useDispatch, useSelector } from '@services/store';
import {
  getUserDataSelector,
  updateUser
} from '@slices/userProfileSlice/userProfileSlice';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserDataSelector);

  const [formValue, setFormValue] = useState({
    name: userData.user.name,
    email: userData.user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: userData.user?.name || '',
      email: userData.user?.email || ''
    }));
  }, [userData.user]);

  const isFormChanged =
    formValue.name !== userData.user?.name ||
    formValue.email !== userData.user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: userData.user?.name || '',
      email: userData.user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
