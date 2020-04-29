import React, { FC } from 'react';
import { Props } from './props';

import './styles.scss';

export const PersonalInfoCard: FC<Props> = (props) => {
  const { phone, address, email, birthday, gender } = props;
  return (
    <div className="personal-info-card d-flex flex-column">
      <div className="d-flex flex-column mb-4">
        <p className="bp3-text-large text-uppercase bp3-running-text mb-3">contact information</p>
        <div className="d-flex personal-info-card__row">
          <p className="mr-3 col-1">Phone:</p>
          <p className="personal-info-card__value col-5">{phone}</p>
        </div>
        <div className="d-flex personal-info-card__row">
          <p className="mr-3 col-1">Address:</p>
          <p className="personal-info-card__value col-5">{address}</p>
        </div>
        <div className="d-flex personal-info-card__row">
          <p className="mr-3 col-1">E-mail:</p>
          <p className="personal-info-card__value col-5">{email}</p>
        </div>
      </div>
      <div className="d-flex flex-column">
        <p className="bp3-text-large text-uppercase bp3-running-text mb-3">basic information</p>
        <div className="d-flex personal-info-card__row">
          <p className="mr-3 col-1">Birthday:</p>
          <p className="personal-info-card__value col-5">{birthday.toISOString()}</p>
        </div>
        <div className="d-flex personal-info-card__row">
          <p className="mr-3 col-1">Gender:</p>
          <p className="personal-info-card__value col-5">{gender}</p>
        </div>
      </div>
    </div>
  );
};
