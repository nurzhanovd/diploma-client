import React, { FC, useMemo, createRef, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { InfoBlock } from 'components/molecules/InfoBlock';
import { useHistory } from 'react-router';

import { Props } from './props';
import './styles.scss';

export const TopicTag: FC<Props> = (props) => {
  const [openInfoBlock, setInfoBlockOpen] = useState(false);
  const toggleInfoBlock = () => setInfoBlockOpen(!openInfoBlock);
  const ref = createRef<HTMLDivElement>();

  const { push } = useHistory();
  const onClick = useCallback((id: any) => push(`/learn/${id}`), [push]);

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

  const { text, nodeId, breadCrumb, className, ...rest } = props;
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
      <span className="topic-tag__table-of-contents p-2 ml-auto" />
    </div>
  );
};
