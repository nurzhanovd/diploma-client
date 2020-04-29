import React, { FC, useCallback } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { MainPage } from 'components/pages/MainPage';
import { Link } from 'react-router-dom';
import { LogOut } from 'components/features/LogOutToast';
import { ProfilePage } from 'components/pages/ProfilePage';
import { CategoriesPage } from 'components/pages/CategoriesPage';
import { CustomRoadMapPage } from 'components/pages/CustomRoadMapPage';
import { CategoryPage } from 'components/pages/CategoryPage';
import { LearnNodePage } from 'components/pages/LearnNodePage';
import { Switch, Route, useHistory } from 'react-router';
import { Props } from './props';
import './styles.scss';

export const MainTemplate: FC<Props> = () => {
  const history = useHistory();
  const onLogOutClick = useCallback(() => {
    LogOut.show({
      message: 'Goodbye, see you soon',
      intent: Intent.PRIMARY,
      icon: 'hand',
    });
    history.push('/auth/sign-in');
  }, [history]);
  return (
    <div className="main-template">
      <header className="main-template__header ">
        <div className="container h-100 d-flex justify-content-between align-items-center">
          <div className="logo">
            <h2 className="main-template__logo bp3-text-large">Logo</h2>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <nav className="main-template__nav-bar">
              <ul className="main-template__link-list d-flex">
                <li className="main-template__link text-uppercase bp3-text-large">about</li>
                <li className="main-template__link text-uppercase bp3-text-large">
                  <Link to="/categories">Categories</Link>
                </li>
                <li className="main-template__link main-template__link--active text-uppercase bp3-text-large">
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </nav>
            <Button
              large
              minimal
              icon="log-out"
              className="main-template__log-out ml-5"
              onClick={onLogOutClick}
            />
          </div>
        </div>
      </header>
      <main className="mt-5">
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/categories">
            <CategoriesPage />
          </Route>
          <Route path="/categories/:id">
            <CategoryPage />
          </Route>
          <Route path="/learn/:nodeID">
            <LearnNodePage />
          </Route>
          <Route path="/create-roadmap">
            <CustomRoadMapPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
};
