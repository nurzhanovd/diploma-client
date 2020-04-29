import React, { FC, useRef, useState } from 'react';
import classNames from 'classnames';
import { InfoBlock } from 'components/molecules/InfoBlock';

import { Props } from './props';
import './styles.scss';

export const TopicTag: FC<Props> = (props) => {
  const [openInfoBlock, setInfoBlockOpen] = useState(false);
  const toggleInfoBlock = () => setInfoBlockOpen(!openInfoBlock);
  const ref = useRef<HTMLDivElement>();

  const { text, nodeId, breadCrumb, className, ...rest } = props;
  return (
    <div className={classNames('topic-tag d-flex', className)} {...rest}>
      <span>{text}</span>
      {openInfoBlock && (
        <InfoBlock
          className="topic-tag__content-block"
          ref={ref}
          breadcrumb={breadCrumb}
          nodeId={nodeId}
          text={text}
        />
      )}
      <span onClick={toggleInfoBlock} className="topic-tag__table-of-contents p-2 ml-auto" />
    </div>
  );
};
