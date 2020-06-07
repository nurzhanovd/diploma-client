import { Icon, Intent } from '@blueprintjs/core';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { ExpandableCourse } from 'components/organisms/ExpandableCourse';
import { useQuery } from '@apollo/react-hooks';
import { nodesAtom, addNodesAction } from 'store/nodes';
import { useAction, useAtom } from '@reatom/react';
import { Props } from './props';
import { TreeNode } from './index.gql';
import { TreeNode as RST, TreeNodeVariables } from './__generated__/TreeNode';
import './styles.scss';
import { parseRST } from './services/parseSog';

const tags = ['IT & Software', 'Software Engineering', 'Programming Languages'];

export const CategoryPage: FC<Props> = (props) => {
  const nodes = useAtom(nodesAtom);
  const addNodes = useAction(addNodesAction);
  const { id } = useParams();
  const { push } = useHistory();
  const onBackClick = useCallback(() => push('/main/categories'), [push]);
  const onRoadMapClick = useCallback(() => push(`/main/create-roadmap?category=${id}`), [push, id]);

  const { data, loading } = useQuery<RST, TreeNodeVariables>(TreeNode, { variables: { id } });

  useEffect(() => {
    if (data) {
      const parsed = parseRST(data);
      if (parsed) {
        addNodes(Object.fromEntries(parsed.map((n) => [n.id, n])));
      }
    }
  }, [data, addNodes, parseRST]);

  const current = useMemo(() => {
    return nodes[id];
  }, [nodes]);

  return (
    <div className="category-page container d-flex flex-column">
      {current && current.title && <h1 className="mb-3 mt-4">{`${current.title} Category`}</h1>}
      <div onClick={onBackClick} className="category-page__all-categories-link px-2 py-1">
        <Icon icon="chevron-left" iconSize={Icon.SIZE_STANDARD} intent={Intent.NONE} />
        All categories
      </div>
      <div onClick={onRoadMapClick} className="category-page__open-road-map-button px-2 py-1">
        <Icon icon="plus" className="mr-1" iconSize={Icon.SIZE_STANDARD} intent={Intent.NONE} />
        Create Custom RoadMap
      </div>
      <div className="category-page__tag-list d-flex my-3">
        {tags.map((n, i) => (
          <div key={n} className="category-page__tag px-2 py-1 mr-2 my-0">
            <p>{n}</p>
          </div>
        ))}
      </div>
      <div className="d-flex flex-column">
        {nodes[id] && <ExpandableCourse rootId={id} className="w-100 mb-4" />}
      </div>
    </div>
  );
};
