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
  const isLeaf = !childes.length;

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
        'row-node--child': !isRoot,
        'row-node--leaf': isLeaf,
        'justify-content-between': !isOpen,
      })}
    >
      <div className="row-node__edge" onClick={onClick}>
        <span className="image" />
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
              children={children}
            />
          ))}
        </div>
      ) : children ? (
        children(current, payload)
      ) : (
        <TopicTag
          className={classNames('flex-grow-1',{ 'ml-3': !isLeaf })}
          nodeId={id}
          text={title}
          breadCrumb={breadCrumb}
        />
      )}
    </div>
  );
};
