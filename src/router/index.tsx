import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthTemplate } from 'components/templates/AuthTemplate';
import { MainTemplate } from 'components/templates/MainTemplate';
import { AboutTemplate } from 'components/templates/AboutTemplate';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/auth">
        <AuthTemplate />
      </Route>
      <Route path="/main">
        <MainTemplate />
      </Route>

      <Route path="/about">
        <AboutTemplate />
      </Route>
    </Switch>
  </BrowserRouter>
);
