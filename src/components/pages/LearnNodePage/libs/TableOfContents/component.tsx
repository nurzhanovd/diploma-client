import React, { FC } from 'react';
import classNames from 'classnames';

import { Props } from './props';
import './styles.scss';

export const TableOfContents: FC<Props> = (props) => {
  const { contents, className, ...rest } = props;
  return (
    <div className={classNames('d-flex flex-column table-of-contents', className)} {...rest}>
      <p className="table-of-contents__title mb-2">Table of contents</p>
      <div className="table-of-contents__list">
        {contents.map((n, i) => (
          <p
            key={n.text}
            className={classNames('table-of-contents__item mb-2', {
              'table-of-contents__item--active': n.active,
            })}
            onClick={n.onClick}
          >
            {`§${i + 1}. ${n.text}`}
          </p>
        ))}
      </div>
    </div>
  );
};
