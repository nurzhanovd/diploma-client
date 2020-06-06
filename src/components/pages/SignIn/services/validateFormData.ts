import { defaultLengthValidation, isValidPassword } from 'core/services/validate';
import { User } from '../types';

const defaultCheck = (v: string) => defaultLengthValidation.isValidSync(v);

export const validateFormData = ({ login, password }: User) => {
  const errors: Partial<Record<keyof User, string>> = {};

  if (!defaultCheck(login)) errors.login = 'Invalid login';
  if (!isValidPassword(password)) errors.password = 'Invalid password';

  return errors;
};
