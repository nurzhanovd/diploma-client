import React, { FC } from 'react';
import { Props } from './props';

import { Card, Title, Description } from './styles';

export const CourseCard: FC<Props> = ({ title, description }) => {
  return (
    <Card className="d-flex">
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};
