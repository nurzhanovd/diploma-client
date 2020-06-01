import React, { FC } from 'react';
import { ProfilePage } from 'components/pages/ProfilePage';
import { CategoriesPage } from 'components/pages/CategoriesPage';
import { CustomRoadMapPage } from 'components/pages/CustomRoadMapPage';
import { CategoryPage } from 'components/pages/CategoryPage';
import { LearnNodePage } from 'components/pages/LearnNodePage';
import { Switch, Route } from 'react-router';
import { NavBar } from 'components/organisms/NavBar';
import { Footer } from 'components/organisms/Footer';
import { Props } from './props';
import './styles.scss';

const links = [
  { path: '/about', text: 'About' },
  { path: '/main/categories', text: 'Categories' },
  { path: '/main/profile', text: 'Profile' },
];

export const MainTemplate: FC<Props> = () => {
  return (
    <div className="main-template d-flex flex-column">
      <header className="main-template__header">
        <NavBar links={links} className="container" />
      </header>
      <main className="mt-5">
        <Switch>
          <Route path="/main/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/main/categories">
            <CategoriesPage />
          </Route>
          <Route path="/main/categories/:id">
            <CategoryPage />
          </Route>
          <Route path="/main/learn/:nodeId">
            <LearnNodePage />
          </Route>
          <Route path="/main/create-roadmap">
            <CustomRoadMapPage />
          </Route>
        </Switch>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};
