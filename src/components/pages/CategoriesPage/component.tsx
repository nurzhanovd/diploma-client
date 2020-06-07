import { useQuery } from '@apollo/react-hooks';
import React, { ChangeEventHandler, FC, useCallback, useEffect, useState } from 'react';
import { CategoryCard } from 'components/molecules/CategoryCard';
import { Switch } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { QueryCategories as QueryCategoriesType } from './__generated__/QueryCategories';
import { Props } from './props';
import { QueryCategories } from './index.gql';
import { parseGQLPayload } from './services/parseGQLPayload';
import './styles.scss';

export const CategoriesPage: FC<Props> = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selected, setSelected] = useState(0);
  const toggleSuggestions = useCallback(() => setShowSuggestions((p) => !p), []);
  const { data: rawData } = useQuery<QueryCategoriesType>(QueryCategories);
  const data = rawData?.Node?.map(parseGQLPayload) || [];

  const onChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    setSelected(+e.target.value);
  }, []);

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
            <select value={selected} onChange={onChange}>
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
            data?.map((n) => (
              <div className="col-4 mb-5" key={n.id}>
                <CategoryCard {...n} />
              </div>
            ))
          ) : (
            <CategoryCard
              text="Data Science"
              description="Data science is an inter-disciplinary field that uses scientific methods, algorithms to extract knowledge data."
              id={1}
              image="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            />
          )}
        </div>
      </div>
      <div className="container-fluid d-flex categories-page__road-map mb-5 px-0">
        <div
          className="col-7 h-100"
          style={{
            background:
              'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60)',
          }}
        />
        <div className="categories-page__road-map-content col-5 d-flex justify-content-center d-flex flex-column">
          <p className="mb-4 categories-page__road-map-text">
            <strong>Try a different approach </strong>
            <br />
            to learning new knowledge and concepts
            <br />
            to achieve personal and professional goals.
          </p>
          <Link to="/main/create-roadmap">
            <button type="button" className="categories-page__road-map-btn">
              Make Own Roadmap
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
