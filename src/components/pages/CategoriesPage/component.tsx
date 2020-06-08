import { useLazyQuery } from '@apollo/react-hooks';
import React, { ChangeEventHandler, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryCard } from 'components/molecules/CategoryCard';
import { Switch } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {
  QueryCategories as QueryCategoriesType,
  QueryCategoriesVariables,
} from './__generated__/QueryCategories';
import { Props } from './props';
import { QueryCategories } from './index.gql';
import { parseGQLPayload } from './services/parseGQLPayload';
import './styles.scss';

export const CategoriesPage: FC<Props> = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selected, setSelected] = useState(0);
  const toggleSuggestions = useCallback(() => setShowSuggestions((p) => !p), []);
  const [fetchCategories, { data: rawData, loading }] = useLazyQuery<
    QueryCategoriesType,
    QueryCategoriesVariables
  >(QueryCategories);
  const data = useMemo(() => {
    const k = showSuggestions ? rawData?.SuggestedRelatedNodes || [] : rawData?.Node;
    return k?.map(parseGQLPayload);
  }, [rawData]);

  useEffect(() => {
    fetchCategories({ variables: { suggestion: showSuggestions, default: !showSuggestions } });
  }, [showSuggestions]);

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
          {data ? (
            data?.map((n) => (
              <div className="col-4 mb-5" key={n.id}>
                <CategoryCard {...n} />
              </div>
            ))
          ) : loading ? (
            <div
              style={{ height: 400 }}
              className="w-100 d-flex align-items-center justify-content-center"
            >
              <Loader color="#101113" type="Oval" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="container-fluid d-flex categories-page__road-map px-0">
        <div
          className="col-7 h-100"
          style={{
            background: 'url(/images/map.jpg)',
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
