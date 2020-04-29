import React, { ChangeEventHandler, FC } from 'react';
import { declareAction, declareAtom } from '@reatom/core';
import { useAction, useAtom } from '@reatom/react';
import { RegisterPayload, Payload } from 'components/pages/SignUp/types';
import { Button, Colors, FormGroup, InputGroup } from '@blueprintjs/core';
import { Link, useHistory } from 'react-router-dom';
import { Props } from './props';
import './styles.scss';

const setField = declareAction<Payload>('setField');
const atom = declareAtom<RegisterPayload>(
  { email: '', name: '', surname: '', password: '', username: '', confirmPassword: '' },
  (on) => [on(setField, (state, { name, value }) => ({ ...state, [name]: value }))],
);

export const SignUp: FC<Props> = (props: Props) => {
  useAtom(atom);
  const history = useHistory();
  const onChange = useAction<ChangeEventHandler<HTMLInputElement>>((e) =>
    setField({ name: e.target.name, value: e.target.value }),
  );
  return (
    <div className="sign-up w-100 h-100 no-gutters">
      <div className="row h-100">
        <div className="sign-up__image-section col-6" />
        <div className="sign-up__form-section col-4 flex-column pl-5">
          <h1 style={{ color: '#137cbd' }} className="bp3-heading mb-2">
            Everything happens first time!
          </h1>
          <h3 style={{ color: Colors.GRAY2 }} className="bp3-running-text mb-4">
            Sign up for getting access to our app
          </h3>
          <form className="col-12 px-0">
            <FormGroup
              className="mb-2 sign-up__label"
              label="Name"
              labelFor="name"
              intent="primary"
            >
              <InputGroup large onChange={onChange} name="name" id="name" intent="primary" />
            </FormGroup>
            <FormGroup
              className="mb-2 sign-up__label"
              label="Surname"
              labelFor="surname"
              intent="primary"
            >
              <InputGroup large onChange={onChange} name="surname" id="surname" intent="primary" />
            </FormGroup>
            <FormGroup
              className="mb-2 sign-up__label"
              label="Email"
              labelFor="email"
              intent="primary"
            >
              <InputGroup
                large
                onChange={onChange}
                name="email"
                id="email"
                intent="primary"
                type="email"
              />
            </FormGroup>
            <FormGroup
              className="mb-2 sign-up__label"
              label="Username"
              labelFor="username"
              intent="primary"
            >
              <InputGroup
                large
                onChange={onChange}
                name="username"
                id="username"
                intent="primary"
              />
            </FormGroup>
            <FormGroup className="mb-2 sign-up__label" label="Password" labelFor="password">
              <InputGroup
                large
                onChange={onChange}
                name="password"
                id="password"
                type="password"
                intent="primary"
                autoComplete="new-password"
              />
            </FormGroup>
            <FormGroup
              className="mb-2 sign-up__label"
              label="Confirm password"
              labelFor="confirmPassword"
            >
              <InputGroup
                large
                onChange={onChange}
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                intent="primary"
                autoComplete="new-password"
              />
            </FormGroup>
            <Button
              color="white"
              icon="log-in"
              text="Sign Up"
              className="w-100 mt-3 sign-up__submit-button"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                history.push('/sign-in');
              }}
              large
              outlined
            />
          </form>
        </div>
      </div>
      <Link to="/auth/sign-in">
        <Button className="sign-up__sign-in-link" icon="map-create" text="Sign In" />
      </Link>
    </div>
  );
};
