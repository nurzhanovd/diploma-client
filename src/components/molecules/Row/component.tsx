import React, { FC, MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { TopicTag } from 'components/molecules/TopicTag';
import { getBreadCrumb } from './services/getBreadCrumb';
import { Props } from './props';

import './styles.scss';

export const Row: FC<Props> = (props) => {
  const { current, payload, isRoot, className, children } = props;
  const { title, id, childes } = current;

  const isOpen = useMemo(() => props.isOpen(id), [props, id]);

  const [breadCrumb, setBreadcrumb] = useState<string[]>([]);

  useEffect(() => {
    setBreadcrumb((prev) => (prev ? getBreadCrumb(payload, current) : prev));
  }, [payload, current]);
  const onClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.stopPropagation();
      if (childes && childes.length) {
        props.onClick(id);
      }
    },
    [props, id, childes],
  );

  return (
    <div
      className={classNames('d-flex row-node', className, {
        'flex-column row-node--active': isOpen,
        'justify-content-between': !isOpen,
        'row-node--child': !isRoot,
        'row-node--leaf': !childes.length,
      })}
    >
      <div className="row-node__text" onClick={onClick}>
        <span className="image" />
        <span className="text d-flex align-items-center">{title}</span>
      </div>
      {isOpen ? (
        <div className="ml-1 pl-5 row-node__childes">
          {childes?.map((n) => (
            <Row
              key={n}
              isRoot={false}
              payload={payload}
              current={payload.data[n]}
              onClick={props.onClick}
              isOpen={props.isOpen}
            />
          ))}
        </div>
      ) : children ? (
        children(current, payload)
      ) : (
        <TopicTag className="ml-3" nodeId={id} text={title} breadCrumb={breadCrumb} />
      )}
    </div>
  );
};
