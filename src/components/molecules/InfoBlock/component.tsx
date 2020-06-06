import React, { FC, forwardRef, Ref } from 'react';
import { content } from 'core/mocks/content';
import classNames from 'classnames';

import './styles.scss';
import { Props } from './props';

export const InfoBlock: FC<Props> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  const { text, nodeId, breadcrumb, className, actions, isComplete, ...rest } = props;
  const { contents } = ((content as any)[nodeId] as any) || {};
  const { contents: defaultContents } = ((content as any)[1] as any) || {};
  const res = contents || defaultContents;
  return (
    <div
      ref={ref}
      className={classNames('info-block d-flex flex-column pt-2', className)}
      {...rest}
    >
      {breadcrumb && (
        <section className="d-flex flex-wrap info-block__breadcrumbs">
          {breadcrumb.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </section>
      )}
      <section className="info-block__title">{text}</section>
      <section
        className={classNames('info-block__status', { 'info-block__status--complete': isComplete })}
      >
        {isComplete ? `You've completed this node!` : `You've not completed it yet`}
      </section>
      <section className="info-block__table-of-contents d-flex flex-column">
        <p className="info-block__table-of-contents-title mb-2">Table of contents</p>
        <div className="d-flex flex-column">
          {(res as string[]).map((n, i) => (
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
