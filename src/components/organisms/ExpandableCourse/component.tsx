import React, { FC } from 'react';
import styled from '@emotion/styled';
import { expandableCourse, nodeClick } from 'store/courses';
import { useAction, useAtom } from '@reatom/react';
import { Row } from 'components/molecules/Row';
import { Props } from './props';
import { ID } from './types/Payload';

const Wrapper = styled.div``;

export const ExpandableCourse: FC<Props> = (props) => {
  const { data } = props;
  const courses = useAtom(expandableCourse);
  const onClick = useAction((id) => nodeClick({ id }));
  const isOpen = (id: ID): boolean => courses.has(id);
  return (
    <Wrapper>
      <Row
        isRoot={true}
        payload={data}
        current={data.data[data.root]}
        onClick={onClick}
        isOpen={isOpen}
      />
    </Wrapper>
  );
};
