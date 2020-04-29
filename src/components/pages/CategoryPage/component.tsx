import { Icon, Intent } from '@blueprintjs/core';
import React, { FC, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import { ExpandableCourse } from 'components/organisms/ExpandableCourse';

import { Props } from './props';
import './styles.scss';

const tags = ['IT & Software', 'Software Engineering', 'Programming Languages'];

const payload = {
  root: 1,
  data: {
    1: {
      id: 1,
      title: 'Frontend',
      childes: [2, 3],
    },
    2: {
      id: 2,
      parentId: 1,
      title: 'Javascript',
      childes: [],
    },
    3: {
      id: 3,
      parentId: 1,
      title: 'CSS',
      childes: [4],
    },
    4: {
      id: 4,
      parentId: 3,
      title: 'Kek',
      childes: [],
    },
  },
};

export const CategoryPage: FC<Props> = (props) => {
  const { id } = useParams();
  const { push } = useHistory();
  const onBackClick = useCallback(() => push('/categories'), [push]);
  const onRoadMapClick = useCallback(() => push(`/create-roadmap?category=${id}`), []);

  return (
    <div className="container category-page d-flex flex-column">
      <h1 className="mb-3 mt-4">{`${id} Category Courses`}</h1>
      <div onClick={onBackClick} className="category-page__all-categories-link px-2 py-1">
        <Icon icon="chevron-left" iconSize={Icon.SIZE_STANDARD} intent={Intent.NONE} />
        All categories
      </div>
      <div onClick={onRoadMapClick} className="category-page__open-road-map-button px-2 py-1">
        <Icon icon="plus" className="mr-1" iconSize={Icon.SIZE_STANDARD} intent={Intent.NONE} />
        Create Custom RoadMap
      </div>
      <div className="category-page__tag-list d-flex">
        {tags.map((n, i) => (
          <div key={n} className="category-page__tag px-2 py-1 mr-2 my-0">
            <p>{n}</p>
          </div>
        ))}
      </div>
      <div>
        <ExpandableCourse data={payload} />
      </div>
    </div>
  );
};
