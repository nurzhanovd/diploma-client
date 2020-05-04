import React, { FC } from 'react';

import { Props } from './props';
import './styles.scss';

export const Fog: FC<Props> = (props) => {
  const { text, onClick } = props;
  return (
    <div className="d-flex fog" onClick={onClick}>
      <p className="fog__text">{text}</p>
    </div>
  );
};
