import React, { FC } from 'react';
import { LearningCategories } from 'components/organisms/LearningCategories';
import { CategoryTag } from 'components/atoms/CategoryTag';
import { useHistory } from 'react-router';
import Slider from 'react-slick';
import { Props } from './props';

import './styles.scss';

const categories = [
  { title: 'Development', id: 1 },
  { title: 'Management', id: 2 },
  { title: 'Marketing', id: 3 },
  { title: 'Finance', id: 3 },
  { title: 'Logistic', id: 3 },
  { title: 'Development', id: 1 },
  { title: 'Administration', id: 3 },
  { title: 'Medicine', id: 3 },
  { title: 'Judgement', id: 3 },
  { title: 'Management', id: 2 },
  { title: 'Marketing', id: 3 },
  { title: 'Development', id: 1 },
  { title: 'Management', id: 2 },
  { title: 'Marketing', id: 3 },
  { title: 'Finance', id: 3 },
  { title: 'Logistic', id: 3 },
  { title: 'Administration', id: 3 },
  { title: 'Medicine', id: 3 },
  { title: 'Judgement', id: 3 },
  { title: 'Finance', id: 3 },
  { title: 'Logistic', id: 3 },
  { title: 'Marketing', id: 3 },
  { title: 'Judgement', id: 3 },
  { title: 'Logistic', id: 3 },
  { title: 'Finance', id: 3 },
  { title: 'Management', id: 2 },
  { title: 'Medicine', id: 3 },
  { title: 'Development', id: 1 },
  { title: 'Administration', id: 3 },
];

const sliderProps = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

export const CategoriesPage: FC<Props> = () => {
  const { push } = useHistory();
  return (
    <div className="d-flex flex-column">
      <div className="container-fluid course-page__banner mb-3">
        <div className="container">
          <p className="course-page__title my-3">Choose categories</p>
          <Slider {...sliderProps} className="mb-4">
            <CategoryTag
              className="mx-4 course-page__new-category"
              title="Hello"
              onClick={() => console.log(1)}
            />
            <CategoryTag
              className="mx-4 course-page__new-category"
              title="Hello"
              onClick={() => console.log(1)}
            />
            <CategoryTag
              className="mx-4 course-page__new-category"
              title="Hello"
              onClick={() => console.log(1)}
            />
            <CategoryTag
              className="mx-4 course-page__new-category"
              title="Hello"
              onClick={() => console.log(1)}
            />
            <CategoryTag
              className="mx-4 course-page__new-category"
              title="Hello"
              onClick={() => console.log(1)}
            />
            <CategoryTag
              className="mx-4 course-page__new-category"
              title="Hello"
              onClick={() => console.log(1)}
            />
            <CategoryTag
              className="mx-4 course-page__new-category"
              title="Hello"
              onClick={() => console.log(1)}
            />
            <CategoryTag
              className="mx-4 course-page__new-category"
              title="Hello"
              onClick={() => console.log(1)}
            />
            <CategoryTag
              className="mx-4 course-page__new-category"
              title="Hello"
              onClick={() => console.log(1)}
            />
            <CategoryTag
              className="mx-4 course-page__new-category"
              title="Hello"
              onClick={() => console.log(1)}
            />
            <CategoryTag
              className="mx-4 course-page__new-category"
              title="Hello"
              onClick={() => console.log(1)}
            />
          </Slider>
        </div>
      </div>
      <div className="container">
        <h2 className="bp3-heading mb-4">Available categories</h2>
        <LearningCategories
          categories={categories.map((n) => ({ ...n, onClick: (id) => push(`/categories/${id}`) }))}
        />
      </div>
      {/* <div> */}
      {/*  <h2 className="bp3-heading mb-4 d-flex align-items-center"> */}
      {/*    Suggestions */}
      {/*    <Tooltip */}
      {/*      className={Classes.TOOLTIP_INDICATOR} */}
      {/*      content="Suggestions based on your preferences" */}
      {/*    > */}
      {/*      <Icon icon="info-sign" /> */}
      {/*    </Tooltip> */}
      {/*  </h2> */}
      {/*  <CourseSuggestion */}
      {/*    cards={[ */}
      {/*      { title: 'OOP', description: 'Description' }, */}
      {/*      { title: 'OOP', description: 'Description' }, */}
      {/*      { title: 'OOP', description: 'Description' }, */}
      {/*      { title: 'OOP', description: 'Description' }, */}
      {/*    ]} */}
      {/*  /> */}
      {/* </div> */}
    </div>
  );
};
