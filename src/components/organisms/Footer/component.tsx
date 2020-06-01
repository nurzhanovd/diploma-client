import React, { FC } from 'react';
import classNames from 'classnames';

import { Props } from './props';
import './styles.scss';

export const Footer: FC<Props> = (props) => {
  const { className, ...rest } = props;
  return (
    <footer className={classNames('footer d-flex', className)} {...rest}>
      <div className="container px-0 d-flex justify-content-between">
        <div className="col-4 d-flex flex-column">
          <p className="footer__text mb-3">A development team in Kazakhstan</p>
          <div className="d-flex align-items-center mb-3">
            <p className="footer__text">43.222015</p>
            <span className="footer__dot mx-3" />
            <p className="footer__text">76.851250</p>
          </div>
          <p className="footer__text mb-5">Almaty, KZ</p>
          <p className="footer__text">Copyright 2020. All Rights Reserved</p>
        </div>
        <div className="col-4 d-flex align-items-center">
          <p className="footer__text">About</p>
          <span className="footer__dot mx-3" />
          <p className="footer__text">Categories</p>
          <span className="footer__dot mx-3" />
          <p className="footer__text">Term of Privacy</p>
        </div>
      </div>
    </footer>
  );
};
