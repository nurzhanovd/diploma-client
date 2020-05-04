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
  const { text, nodeId, breadCrumb, className, ...rest } = props;
  const [openInfoBlock, setInfoBlockOpen] = useState(false);
  const toggleInfoBlock: MouseEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInfoBlockOpen(!openInfoBlock);
  };
  const ref = createRef<HTMLDivElement>();

  const { push } = useHistory();
  const onClick = useCallback(() => push(`/main/learn/${nodeId}`), [push, nodeId]);

  const actions = useMemo(
    () => [
      { text: 'Open topic', onClick },
      { text: 'I already know it, skip', onClick },
    ],
    [onClick],
  );

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
    <div onClick={onClick} className={classNames('topic-tag d-flex', className)} {...rest}>
      <span>{text}</span>
      {openInfoBlock && (
        <div ref={ref}>
          <InfoBlock
            className="topic-tag__content-block"
            breadcrumb={breadCrumb}
            nodeId={nodeId}
            text={text}
            actions={actions}
          />
        </div>
      )}
      <span onClick={toggleInfoBlock} className="topic-tag__table-of-contents p-2 ml-auto" />
    </div>
  );
};
