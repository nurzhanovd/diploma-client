import React, { FC } from 'react';
import classNames from 'classnames';

import { Props } from './props';
import './styles.scss';

export const Footer: FC<Props> = (props) => {
  const { className, ...rest } = props;
  return (
    <footer className={classNames('footer d-flex', className)}>
      <div className="col-4 d-flex flex-column">
        <p className="footer__text mb-3">A development team in Kazakhstan</p>
        <div className="d-flex align-items-center">
          <p className="footer__text mr-3">43.222015</p>
          <span className="footer__dot" />
          <p className="footer__text ml-3">76.851250</p>
        </div>
      </div>
    </footer>
  );
};
