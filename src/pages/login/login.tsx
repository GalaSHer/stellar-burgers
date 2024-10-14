import { FC, FormEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '@services/store';
import { loginUser } from '@slices/userProfileSlice';
import { useForm } from '@services/hooks/useForm';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [values, onChange] = useForm({ email: '', password: '' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email: values.email, password: values.password }));
  };

  return (
    <LoginUI
      errorText=''
      email={values.email}
      password={values.password}
      onChange={onChange}
      handleSubmit={handleSubmit}
    />
  );
};
