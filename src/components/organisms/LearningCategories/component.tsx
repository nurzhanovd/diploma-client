import React, { FC, useCallback } from 'react';
import { CategoryTag } from 'components/atoms/CategoryTag';
import { Props } from './props';

export const LearningCategories: FC<Props> = (props) => {
  const { categories } = props;
  const onTagClick = useCallback((id, func) => () => func(id), []);
  return (
    <div className="learning-category d-flex flex-wrap">
      {categories.map(({ title, id, onClick }, i) => (
        <CategoryTag
          key={id}
          className="mr-4 mb-4"
          title={title}
          onClick={onTagClick(id, onClick)}
        />
      ))}
    </div>
  );
};
