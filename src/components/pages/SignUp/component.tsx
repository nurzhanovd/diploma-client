import React, { createElement, FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { CategoryTag } from 'components/atoms/CategoryTag';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import { useMutation } from '@apollo/react-hooks';
import { SignUp as Register, SignUpVariables } from './__generated__/SignUp';
import { query } from './index.gql';

import { Props } from './props';
import { validateFormData } from './services/validateFormData';
import './styles.scss';
import { RegisterPayload } from './types';

const defaultValue = {
  email: 'nurzhanovdev@gmail.comq',
  username: 'dauletq',
  password: 'qwerty123',
  confirmPassword: 'qwerty123',
};

const Error = ({ children }: any) => createElement('span', { className: 'error-text', children });

const tags = [
  'IT',
  'Software Development',
  'Computer Science',
  'Data Science',
  'Programming Languages',
  'IT Management',
  'IT Journalism',
];

export const SignUp: FC<Props> = (props: Props) => {
  const { push } = useHistory();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterPayload | 'general', string>>>(
    {},
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [register, { loading, data, called }] = useMutation<Register, SignUpVariables>(query);

  const onValidate = (errorsField: Record<keyof RegisterPayload, string>) => {
    const errorList = validateFormData(errorsField);
    setErrors(errorList);
    return errorList;
  };

  const onSubmit = async (values: SignUpVariables) => {
    setErrors({});
    register({ variables: values });
  };

  useEffect(() => {
    if (data?.SignUp?.errors?.length) {
      setErrors(Object.fromEntries(data.SignUp.errors.map((n: any) => [n?.key, n?.value])));
    } else if (data?.SignUp?.token) {
      localStorage.setItem('token', data.SignUp.token);
      setStep(2);
    }
  }, [data]);
  return (
    <div className="sign-up d-flex flex-column">
      <h1 style={{ color: 'var(--royal-blue)' }} className="bp3-heading mb-2">
        Everything happens first time!
      </h1>
      <h3 style={{ color: 'var(--black)' }} className="bp3-running-text mb-4">
        Sign up for getting access to our app
      </h3>
      {step === 1 ? (
        <Formik
          validate={onValidate}
          initialValues={defaultValue}
          onSubmit={onSubmit}
          validateOnChange={false}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              className="col-12 px-0"
            >
              <FormGroup
                className="mb-2 sign-up__label"
                label="Email"
                labelFor="email"
                intent="primary"
              >
                <InputGroup
                  large
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  id="email"
                  intent="primary"
                  type="email"
                />
                {errors.email && <Error>{errors.email}</Error>}
              </FormGroup>
              <FormGroup
                className="mb-2 sign-up__label"
                label="Username"
                labelFor="username"
                intent="primary"
              >
                <InputGroup
                  value={values.username}
                  large
                  onChange={handleChange}
                  name="username"
                  id="username"
                  intent="primary"
                />
                {errors.username && <Error>{errors.username}</Error>}
              </FormGroup>
              <FormGroup className="mb-2 sign-up__label" label="Password" labelFor="password">
                <InputGroup
                  large
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  id="password"
                  type="password"
                  intent="primary"
                  autoComplete="new-password"
                />
                {errors.password && <Error>{errors.password}</Error>}
              </FormGroup>
              <FormGroup
                className="mb-2 sign-up__label"
                label="Confirm password"
                labelFor="confirmPassword"
              >
                <InputGroup
                  large
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  intent="primary"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
              </FormGroup>
              {errors.general && <Error>{errors.general}</Error>}
              <Button
                color="white"
                text={loading ? 'Loading' : 'Next'}
                className="w-100 mt-3 sign-up__submit-button"
                type="submit"
                large
                outlined
                {...(loading ? {} : { rightIcon: 'chevron-right' })}
              >
                {loading && <div className="lds-dual-ring ml-2" />}
              </Button>
            </form>
          )}
        </Formik>
      ) : (
        <div className="d-flex flex-column tag-list">
          <p className="tag-list__text mb-2">Choose what you want to learn</p>
          <div className="d-flex flex-wrap">
            {selectedTags.map((n) => (
              <div key={n} className="d-flex selected-tag mb-2">
                <span className="selected-tag__text">{n}</span>
                <span
                  onClick={() => setSelectedTags((s) => s.filter((m) => n !== m))}
                  className="selected-tag__close"
                >
                  x
                </span>
              </div>
            ))}
          </div>
          <div className="d-flex flex-wrap">
            {tags.map((n) => (
              <CategoryTag
                key={n}
                title={n}
                onClick={() => {
                  setSelectedTags((s) => [...s, n]);
                }}
                className={classNames('sign-up__category-tag', {
                  'd-none': selectedTags.includes(n),
                })}
              />
            ))}
          </div>
          <Button
            color="white"
            rightIcon="chevron-right"
            text="Next"
            className="w-100 mt-3 sign-up__submit-button"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault();
              push('/about');
            }}
            large
            outlined
          />
        </div>
      )}
      <Link to="/auth/sign-in">
        <Button className="sign-up__sign-in-link" icon="map-create" text="Sign In" />
      </Link>
    </div>
  );
};
