import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router';
import classNames from 'classnames';
import { Props } from './props';

import './styles.scss';

export const CategoryCard: FC<Props> = (props) => {
  const { className, id, text, description, image } = props;
  const { push } = useHistory();
  const onClick = useCallback(() => push(`/main/categories/${id}`), [push, id]);
  return (
    <div
      style={{ background: `url(${image})` }}
      className={classNames(className, 'category-card-wrapper')}
    >
      <div className="d-flex flex-column category-card">
        <p className="mb-2 category-card__title">{text}</p>
        <p className="mb-4 category-card__desc">{description}</p>
        <button className="category-card__btn bp3-button" type="button" onClick={onClick}>
          Start learn
        </button>
      </div>
    </div>
  );
};
