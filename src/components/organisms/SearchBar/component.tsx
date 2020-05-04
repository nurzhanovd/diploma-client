import classNames from 'classnames';
import React, { FC } from 'react';
import { Icon } from '@blueprintjs/core';

import { Props } from './props';
import './styles.scss';

export const SearchBar: FC<Props> = (props) => {
  const { onClose, className, ...rest } = props;
  return (
    <div className={classNames('search-bar', className)} {...rest}>
      <div className="d-flex search-bar__form align-items-center w-100">
        <Icon
          className="mr-5 d-flex align-items-center search-bar__search-icon"
          iconSize={30}
          color="white"
          icon="search"
        />
        <input placeholder="Search" className="search-bar__input" />
        <Icon
          onClick={onClose}
          className="ml-auto d-flex align-items-center search-bar__close-icon"
          iconSize={30}
          color="white"
          icon="cross"
        />
      </div>
    </div>
  );
};
