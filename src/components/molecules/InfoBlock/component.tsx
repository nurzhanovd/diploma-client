import React, { FC, forwardRef, Ref } from 'react';
import classNames from 'classnames';

import './styles.scss';
import { Props } from './props';

export const InfoBlock: FC<Props> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  const { text, nodeId, breadcrumb, className, actions, ...rest } = props;

  return (
    <div
      ref={ref}
      className={classNames('info-block d-flex flex-column pt-2', className)}
      {...rest}
    >
      <section className="d-flex info-block__breadcrumbs">
        {breadcrumb.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </section>
      <section className="info-block__title">{text}</section>
      <section className="info-block__status">You've not completed it yet</section>
      <section className="info-block__table-of-contents d-flex flex-column">
        <p className="info-block__table-of-contents-title mb-2">Table of contents</p>
        <div className="d-flex flex-column">
          {['Algorithms', 'Data structures', 'Rocket Science'].map((n, i) => (
            <p key={n} className="info-block__table-of-contents-text">{`${i + 1}.${n}`}</p>
          ))}
        </div>
      </section>
      {actions.length && (
        <section className="info-block__actions">
          {actions.map((n) => (
            <button
              key={n.text}
              onClick={(e: any) => {
                e.stopPropagation();
                n.onClick(nodeId);
              }}
              type="button"
            >
              {n.text}
            </button>
          ))}
        </section>
      )}
    </div>
  );
});
