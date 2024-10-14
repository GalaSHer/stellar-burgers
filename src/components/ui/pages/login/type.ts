import { FormEvent } from 'react';

export type LoginUIProps = {
  errorText: string | undefined;
  email: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
