import { defaultLengthValidation, isValidEmail, isValidPassword } from 'core/services/validate';
import { RegisterPayload, Errors } from '../types';

const defaultCheck = (v: string) => defaultLengthValidation.isValidSync(v);

export const validateFormData = ({
  username,
  email,
  password,
  confirmPassword,
}: RegisterPayload): Errors => {
  const errors: Errors = {};

  if (!defaultCheck(username)) errors.username = 'Invalid username';
  if (!isValidEmail(email)) errors.email = 'Invalid email';
  if (!isValidPassword(password)) errors.password = 'Invalid password';
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords does not match';

  return errors;
};
