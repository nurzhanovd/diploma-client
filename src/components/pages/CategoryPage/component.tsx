import { Icon, Intent } from '@blueprintjs/core';
import React, { FC, useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { ExpandableCourse } from 'components/organisms/ExpandableCourse';
import { useQuery } from '@apollo/react-hooks';
import payload from './mock';

import { Node } from './index.gql';
import { Props } from './props';
import './styles.scss';

const tags = ['IT & Software', 'Software Engineering', 'Programming Languages'];

export const CategoryPage: FC<Props> = (props) => {
  const { id } = useParams();
  const [fetchPayload, setFetchPayload] = useState<{ id: string; type: 'Fog' | 'Sog' }>({
    id,
    type: 'Sog',
  });
  const {} = useQuery(Node);
  const { push } = useHistory();
  const onBackClick = useCallback(() => push('/main/categories'), [push]);
  const onRoadMapClick = useCallback(() => push(`/main/create-roadmap?category=${id}`), [push, id]);

  return (
    <div className="category-page container d-flex flex-column">
      <h1 className="mb-3 mt-4">Computer Science Category</h1>
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
        {payload.map((n) => (
          <ExpandableCourse className="w-100 mb-4" data={n} />
        ))}
      </div>
    </div>
  );
};
