import React, { FC } from 'react';
import Slider from 'react-slick';
import { CourseCard } from './lib/CourseCard';
import { Props } from './props';

export const CourseSuggestion: FC<Props> = ({ cards }) => {
  return (
    <Slider infinite speed={1000} slidesToShow={2} slidesToScroll={2}>
      {cards.map((n, i) => (
        <div>
          <CourseCard key={i} {...n} />
        </div>
      ))}
    </Slider>
  );
};
