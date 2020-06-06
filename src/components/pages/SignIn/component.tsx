import React, {
  ChangeEventHandler,
  createElement,
  FC,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { declareAction, declareAtom } from '@reatom/core';
import { useAction, useAtom } from '@reatom/react';
import { User, Payload } from 'components/pages/SignIn/types';
import { Button, Colors, FormGroup, InputGroup, Switch } from '@blueprintjs/core';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Props } from './props';
import './styles.scss';
import { validateFormData } from './services/validateFormData';

import { query } from './index.gql';
import { Login, LoginVariables } from './__generated__/Login';

const setField = declareAction<Payload>('setField');
const atom = declareAtom<User>({ login: '', password: '' }, (on) => [
  on(setField, (state, { name, value }) => ({ ...state, [name]: value })),
]);

const Error = ({ children }: any) => createElement('span', { className: 'error-text', children });

export const SignIn: FC<Props> = () => {
  const fields = useAtom(atom);
  const history = useHistory();
  const onChange = useAction<ChangeEventHandler<HTMLInputElement>>((e) =>
    setField({ name: e.target.name, value: e.target.value }),
  );
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({
    login: '',
    password: '',
  });

  const [login, { loading, data }] = useMutation<Login, LoginVariables>(query);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const validate = validateFormData(fields);
    if (validate.login || validate.password) {
      setErrors(validateFormData(fields));
    } else {
      login({ variables: { login: fields.login, password: fields.password } });
    }
  };
  useEffect(() => {
    if (data?.SignIn?.errors?.length) {
      setErrors(Object.fromEntries(data.SignIn.errors.map((n) => [n?.key, n?.value])));
    } else if (data) {
      const { token, uuid, username, email } = data?.SignIn || {};
      localStorage.setItem('token', token!);
      localStorage.setItem('uuid', uuid!);
      localStorage.setItem('username', username!);
      localStorage.setItem('email', email!);
      history.push('/main/categories');
    }
  }, [data, history]);
  return (
    <>
      <h1 style={{ color: 'var(--royal-blue)' }} className="bp3-heading mb-2">
        Welcome to roots
      </h1>
      <h3 style={{ color: Colors.GRAY2 }} className="bp3-running-text mb-4">
        Sign in by entering information below
      </h3>
      <form onSubmit={onSubmit} className="col-12 px-0">
        <FormGroup className="mb-2" label="Login" labelFor="login" intent="primary">
          <InputGroup required onChange={onChange} name="login" id="login" intent="primary" />
          {errors.login && <Error>{errors.login}</Error>}
        </FormGroup>
        <FormGroup className="mb-2" label="Password" labelFor="password">
          <InputGroup
            required
            onChange={onChange}
            name="password"
            id="password"
            type="password"
            intent="primary"
          />
          {errors.password && <Error>{errors.password}</Error>}
        </FormGroup>
        <div className="row no-gutters w-100 my-3 justify-content-between align-items-center">
          <Switch className="my-0" style={{ color: 'var(--black)' }} label="Remember me" />
          <p className="m-0" style={{ color: 'var(--black)', cursor: 'pointer' }}>
            Forgotten password
          </p>
        </div>
        <Button
          type="submit"
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
