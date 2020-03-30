import React, { FC } from 'react';
import { SignIn } from 'components/pages/SignIn';
import { SignUp } from 'components/pages/SignUp';
import { Route, Switch } from 'react-router';
import { Props } from './props';

import './styles.scss';

export const AuthTemplate: FC<Props> = () => {
  return (
    <main className="auth-template">
      <Switch>
        <Route path="/auth/sign-in">
          <SignIn />
        </Route>
        <Route path="/auth/sign-up">
          <SignUp />
        </Route>
      </Switch>
    </main>
  );
};
