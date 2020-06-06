import React, { FC, useCallback, useEffect } from "react";
import styled from '@emotion/styled';
import { expandableCourse, nodeClick } from 'store/courses';
import { useAction, useAtom } from '@reatom/react';
import { Row, NodeId } from 'components/molecules/Row';
import { nodesAtom } from 'store/nodes';
import { TreeNode } from 'components/organisms/TreeNode';
import { Props } from './props';

const Wrapper = styled.div``;

export const ExpandableCourse: FC<Props> = (props) => {
  const { className, rootId = '' } = props;
  const courses = useAtom(expandableCourse);
  const nodes = useAtom(nodesAtom);
  const isOpen = useCallback((id: NodeId) => courses.has(id), [courses]);
  const getChildes = useCallback((id: NodeId) => nodes[id].childes as any, []);
  const isLeaf = useCallback((id: NodeId) => Boolean(!nodes[id].childes.length), []);
  const onClick = useAction((id) => nodeClick({ id }));

  useEffect(() => {
    if (!isOpen(rootId)) {
      onClick(rootId);
    }
  }, [rootId]);
  return (
    <Wrapper className={className}>
      <Row
        isRoot={true}
        current={rootId}
        onClick={onClick}
        isOpen={isOpen}
        isLeaf={isLeaf}
        getChildes={getChildes}
      >
        {(id) => {
          return <TreeNode id={id} />;
        }}
      </Row>
    </Wrapper>
  );
};
