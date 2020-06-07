import React, { FC, createRef, useState, useCallback, useEffect, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { Props } from './props';
import './styles.scss';

export const TopicTag: FC<Props> = (props) => {
  const { text, isComplete, className, children, ...rest } = props;
  const [openInfoBlock, setInfoBlockOpen] = useState(false);
  const toggleInfoBlock: MouseEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInfoBlockOpen(!openInfoBlock);
  };
  const ref = createRef<HTMLDivElement>();

  const isOutSideClick = useCallback(
    (event) => {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        setInfoBlockOpen(false);
      }
    },
    [ref],
  );

  useEffect(() => {
    document.addEventListener('mousedown', isOutSideClick);
    return () => document.removeEventListener('mousedown', isOutSideClick);
  }, [isOutSideClick]);

  return (
    <div
      className={classNames('d-flex topic-tag__wrapper', className, {
        'topic-tag__wrapper--completed': isComplete,
      })}
      {...rest}
    >
      <div className={classNames('topic-tag d-flex flex-grow-1')}>
        <span>{text}</span>
      </div>
      {openInfoBlock && (
        <div ref={ref} className="topic-tag__content-block">
          {children}
        </div>
      )}
      <div onClick={toggleInfoBlock}>
        <div className="topic-tag__table-of-contents p-2 ml-auto" />
      </div>
    </div>
  );
};
