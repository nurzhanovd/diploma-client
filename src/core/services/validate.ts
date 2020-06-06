import * as yup from 'yup';

export const validateString = (maxLength: number) => yup.string().max(maxLength).required();

export const defaultLengthValidation = validateString(30);

export const isValidPassword = (v: string) => yup.string().min(8).required().isValidSync(v);
export const isValidEmail = (v: string) => yup.string().required().email().isValidSync(v);
