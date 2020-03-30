import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthTemplate } from 'components/templates/AuthTemplate';
import { MainTemplate } from 'components/templates/MainTemplate';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/auth">
        <AuthTemplate />
      </Route>

      <Route path="/" exact>
        <MainTemplate />
      </Route>
    </Switch>
  </BrowserRouter>
);
