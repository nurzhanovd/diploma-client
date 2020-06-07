import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { nodesAtom } from 'store/nodes';
import { useAtom } from '@reatom/react';
import { InfoBlock } from 'components/molecules/InfoBlock';
import { TopicTag } from 'components/molecules/TopicTag';

import { useHistory } from 'react-router';
import { Props } from './props';
import { getBreadCrumb } from './services/getBreadCrumb';

export const TreeNode: FC<Props> = (props) => {
  const { id, className } = props;
  const nodes = useAtom(nodesAtom);
  const { push } = useHistory();
  const [breadCrumb, setBreadcrumb] = useState<string[]>([]);
  const { title, tableOfContents, completed } = useMemo(() => nodes[id], [id, nodes]);
  const handleNodeClick = useCallback(() => push(`/main/learn/${id}`), [id, push]);

  useEffect(() => {
    setBreadcrumb((prev) => (prev ? getBreadCrumb(nodes, nodes[id]) : prev));
  }, [nodes, id]);

  const status = useMemo(() => {
    const rowChildes = nodes[id].childes;
    const doneLength = rowChildes.filter((n) => nodes[n].completed).length;
    return rowChildes.length ? `${doneLength}/${rowChildes.length}` : '';
  }, [id, nodes]);
  return (
    <TopicTag className={classNamesad} text={`${title} ${status}`}>
      <InfoBlock
        nodeId={id}ass
        text={title}
        breadcrumb={breadCrumb}
        tableOfContents={tableOfContents}
        isComplete={completed}
        actions={[{ text: 'Open node', onClick: handleNodeClick }]}
      />
    </TopicTag>
  );
};
