import React, { ChangeEventHandler, FC } from 'react';
import { declareAction, declareAtom } from '@reatom/core';
import { useAction, useAtom } from '@reatom/react';
import { User, Payload } from 'components/pages/SignIn/types';
import { Button, Colors, FormGroup, InputGroup, Switch } from '@blueprintjs/core';
import { Link, useHistory } from 'react-router-dom';
import { Props } from './props';
import './styles.scss';

const setField = declareAction<Payload>('setField');
const atom = declareAtom<User>({ login: '', password: '' }, (on) => [
  on(setField, (state, { name, value }) => ({ ...state, [name]: value })),
]);

export const SignIn: FC<Props> = (props: Props) => {
  useAtom(atom);
  const history = useHistory();
  const onChange = useAction<ChangeEventHandler<HTMLInputElement>>((e) =>
    setField({ name: e.target.name, value: e.target.value }),
  );
  return (
    <>
      <h1 style={{ color: '#137cbd' }} className="bp3-heading mb-2">
        Welcome to roots
      </h1>
      <h3 style={{ color: Colors.GRAY2 }} className="bp3-running-text mb-4">
        Sign in by entering information below
      </h3>
      <form className="col-12 px-0">
        <FormGroup className="mb-2" label="Login" labelFor="login" intent="primary">
          <InputGroup onChange={onChange} name="login" id="login" intent="primary" />
        </FormGroup>
        <FormGroup className="mb-2" label="Password" labelFor="password">
          <InputGroup
            onChange={onChange}
            name="password"
            id="password"
            type="password"
            intent="primary"
          />
        </FormGroup>
        <div className="row no-gutters w-100 my-3 justify-content-between align-items-center">
          <Switch className="my-0" label="Remember me" />
          <p className="m-0" style={{ color: '#3b6bd2', cursor: 'pointer' }}>
            Forgotten password
          </p>
        </div>
        <Button
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            history.push('/categories');
          }}
          color="white"
          icon="log-in"
          text="Sign In"
          className="w-100 sign-in__submit-button"
          large
          outlined
        />
      </form>
      <div className="sign-in__sign-up-link">
        <Link to="/auth/sign-up">
          <Button icon="map-create" text="Sign Up" outlined />
        </Link>
      </div>
    </>
  );
};
