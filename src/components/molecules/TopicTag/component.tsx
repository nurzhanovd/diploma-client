import React, {
  FC,
  useMemo,
  createRef,
  useState,
  useCallback,
  useEffect,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';
import { InfoBlock } from 'components/molecules/InfoBlock';
import { useHistory } from 'react-router';

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
      className={classNames('topic-tag d-flex', className, { 'topic-tag--completed': isComplete })}
      {...rest}
    >
      <span>{text}</span>
      {openInfoBlock && (
        <div ref={ref}>
          <div className="topic-tag__content-block">{children}</div>
        </div>
      )}
      <span onClick={toggleInfoBlock} className="topic-tag__table-of-contents p-2 ml-auto" />
    </div>
  );
};
