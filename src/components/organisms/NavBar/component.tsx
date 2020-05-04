import React, { FC, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import { Button, Intent, Icon, Overlay, IOverlayableProps } from '@blueprintjs/core';
import { LogOut } from 'features/LogOutToast';
import { SearchBar } from 'components/organisms/SearchBar';

import { Props } from './props';
import './styles.scss';

export const NavBar: FC<Props> = (props) => {
  const { className, links } = props;
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = useCallback(() => setShowSearch((p) => !p), []);
  const history = useHistory();
  const onLogOutClick = useCallback(() => {
    LogOut.show({
      message: 'Goodbye, see you soon',
      intent: Intent.PRIMARY,
      icon: 'hand',
    });
    history.push('/auth/sign-in');
  }, [history]);
  const overlayOptions = useMemo<Partial<IOverlayableProps>>(
    () => ({
      canEscapeKeyClose: true,
      transitionDuration: 5,
    }),
    [],
  );
  return (
    <div
      className={classNames('nav-bar d-flex justify-content-between align-items-center', className)}
    >
      <div className="logo">
        <h2 className="bp3-text-large">Logo</h2>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <Icon onClick={toggleSearch} className="nav-bar__search-icon" icon="search" iconSize={18} />
        <nav className="d-flex align-items-center">
          <ul className="nav-bar__link-list d-flex">
            {links.map((n) => (
              <li key={n.path} className="nav-bar__link bp3-text-large">
                <Link to={n.path}>{n.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          large
          minimal
          icon="log-out"
          className="nav-bar__log-out ml-5"
          onClick={onLogOutClick}
        />
      </div>
      <Overlay {...overlayOptions} isOpen={showSearch} onClose={toggleSearch}>
        <SearchBar onClose={toggleSearch} className="nav-bar__search-bar w-100" />
      </Overlay>
    </div>
  );
};
