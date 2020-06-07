import React, { FC, MouseEventHandler, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import { Props } from './props';

import './styles.scss';

export const Row: FC<Props> = (props) => {
  const { isRoot, current, children, onClick, isLeaf: checkIsLeaf, getChildes, className } = props;

  const isOpen = useMemo(() => props.isOpen(current), [props, current]);
  const isLeaf = useMemo(() => checkIsLeaf(current), [current, checkIsLeaf]);
  const childes = useMemo(() => getChildes(current), [current, getChildes]);

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.stopPropagation();
      onClick(current);
    },
    [current, onClick],
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
      <div className="row-node__edge d-flex align-items-center w-100">
        <span className="image" onClick={handleClick} />
        <div className={classNames('flex-grow-1', { 'ml-3': !isLeaf })}>
          {children(current, { isLeaf, isOpen, childes })}
        </div>
      </div>
      {isOpen && (
        <div className="row-node__childes">
          {childes?.map((n) => (
            <Row
              key={n}
              isRoot={false}
              current={n}
              onClick={props.onClick}
              isOpen={props.isOpen}
              isLeaf={checkIsLeaf}
              getChildes={getChildes}
            >
              {children}
            </Row>
          ))}
        </div>
      )}
    </div>
  );
};
