import React, { FC } from 'react';
import { SignIn } from 'components/pages/SignIn';
import { SignUp } from 'components/pages/SignUp';
import { Route, Switch } from 'react-router';
import { Props } from './props';

import './styles.scss';

export const AuthTemplate: FC<Props> = () => {
  return (
    <main className="auth-template">
      <div className="auth w-100 h-100 no-gutters">
        <div className="row h-100">
          <div className="auth__image-section col-6" />
          <div className="auth__form-section col-4 flex-column pl-5">
            <Switch>
              <Route path="/auth/sign-in">
                <SignIn />
              </Route>
              <Route path="/auth/sign-up">
                <SignUp />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </main>
  );
};
