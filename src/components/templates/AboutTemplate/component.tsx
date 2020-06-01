import React, { FC } from 'react';
import { Switch, Route } from 'react-router';
import { NavBar } from 'components/organisms/NavBar';
import { Footer } from 'components/organisms/Footer';
import { AboutPage } from 'components/pages/AboutPage';

import './styles.scss';

const links = [
  { path: '/main/categories', text: 'Categories' },
  { path: '/auth/sign-in', text: 'Sign In' },
];

export const AboutTemplate: FC = () => {
  return (
    <div className="about-template d-flex flex-column">
      <div className="w-100 about-template__navbar">
        <NavBar links={links} className="container-fluid px-0" />
      </div>
      <Switch>
        <Route path="/about">
          <AboutPage />
        </Route>
      </Switch>
      <Footer className="mt-auto" />
    </div>
  );
};
