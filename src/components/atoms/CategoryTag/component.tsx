import React, { FC } from 'react';
import classNames from 'classnames';
import { Props } from './props';

import './styles.scss';

export const CategoryTag: FC<Props> = ({ onClick, title, className }) => (
  <div className={classNames('category-tag', className)} onClick={onClick}>
    {title}
  </div>
);
