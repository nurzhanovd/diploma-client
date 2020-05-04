import React, { FC, useCallback, useMemo, useState } from 'react';
import { CategoryCard } from 'components/molecules/CategoryCard';
import { Switch } from '@blueprintjs/core';
import { useQuery } from '@apollo/react-hooks';
import { Props } from './props';
import { QueryCategories } from './index.gql';
import { parseGQLPayload } from './services/parseGQLPayload';
import { Courses } from './__generated__/Courses';

import './styles.scss';

const list = [
  {
    text: 'Computer Science',
    description:
      'Computer science is the study of processes that represented as data in the form of programs.',
    id: 1,
    image:
      'https://images.unsplash.com/photo-1542064923-b4bd6908c745?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    text: 'Computer Science',
    description:
      'Computer science is the study of processes that represented as data in the form of programs.',
    id: 1,
    image:
      'https://images.unsplash.com/photo-1542064923-b4bd6908c745?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    text: 'Computer Science',
    description:
      'Computer science is the study of processes that represented as data in the form of programs.',
    id: 1,
    image:
      'https://images.unsplash.com/photo-1542064923-b4bd6908c745?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    text: 'Computer Science',
    description:
      'Computer science is the study of processes that represented as data in the form of programs.',
    id: 1,
    image:
      'https://images.unsplash.com/photo-1542064923-b4bd6908c745?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    text: 'Computer Science',
    description:
      'Computer science is the study of processes that represented as data in the form of programs.',
    id: 1,
    image:
      'https://images.unsplash.com/photo-1542064923-b4bd6908c745?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    text: 'Computer Science',
    description:
      'Computer science is the study of processes that represented as data in the form of programs.',
    id: 1,
    image:
      'https://images.unsplash.com/photo-1542064923-b4bd6908c745?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
];

export const CategoriesPage: FC<Props> = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const toggleSuggestions = useCallback(() => setShowSuggestions((p) => !p), []);
  const { data: rawData, loading } = useQuery<Courses>(QueryCategories);
  const data = useMemo(() => parseGQLPayload(rawData), [rawData]);
  return (
    <div className="d-flex flex-column categories-page">
      <div className="container-fluid categories-page__banner d-flex flex-column justify-content-center align-items-center">
        <p className="categories-page__title mb-2">Browse the full library</p>
        <p className="categories-page__desc">
          Get new knowledge of various fields authored and improved by our community
        </p>
      </div>
      <div className="container-fluid categories-page__filter d-flex align-items-center">
        <div className="container d-flex align-items-center">
          <p className="mr-4">Filter by:</p>
          <div className="bp3-select bp3-large">
            <select defaultValue="0">
              <option value="0">Category</option>
              <option value="1">Recently Added</option>
              <option value="2">Popular</option>
            </select>
          </div>
          <Switch
            className="ml-auto mb-0"
            checked={showSuggestions}
            label="Suggestions"
            onChange={toggleSuggestions}
          />
        </div>
      </div>
      <div className="container mt-3">
        <h2 className="bp3-heading mb-4">
          {showSuggestions ? 'Categories based on your suggestions' : 'Available categories'}
        </h2>
        <div className="d-flex row px-0">
          {!showSuggestions ? (
            data.map((n) => (
              <div className="col-4 mb-5" key={n.id}>
                <CategoryCard
                  {...n}
                  image="https://images.unsplash.com/photo-1542064923-b4bd6908c745?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                />
              </div>
            ))
          ) : (
            <CategoryCard
              text="Data Science"
              description="Data science is the study of processes that represented as data in the form of programs."
              id={1}
              image="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            />
          )}
        </div>
      </div>
    </div>
  );
};
