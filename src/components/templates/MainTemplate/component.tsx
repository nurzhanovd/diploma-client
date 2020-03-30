import React, { FC } from 'react';
import { MainPage } from 'components/pages/MainPage';
import { Switch, Route } from 'react-router';
import { Props } from './props';
import './styles.scss';

export const MainTemplate: FC<Props> = () => {
  return (
    <div className="main-template">
      <header className="main-template__header" />
      <main>
        <Switch>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
};
