import React, { FC, useCallback, useState } from 'react';
import { CategoryCard } from 'components/molecules/CategoryCard';
import { Switch } from '@blueprintjs/core';
import { Props } from './props';

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
            <select>
              <option selected>Category</option>
              <option value="1">All</option>
              <option value="2">Computer Science</option>
              <option value="3">Management</option>
              <option value="4">Data Science</option>
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
            list.map((n) => (
              <div className="col-4 mb-5" key={n.id}>
                <CategoryCard {...n} />
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
