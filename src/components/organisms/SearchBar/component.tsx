import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import { Icon } from '@blueprintjs/core';

import { Props } from './props';
import './styles.scss';

const categories = ['OOP', 'Functional Programming', 'Algorithms', 'CI/CD'];
const roadmap = [
  'Frontend',
  'Backend',
  'Data Engineering',
  'DevOps',
  'Product Owner',
  'Product Management',
];
const nodes = ['Merge Sort', 'BFS', 'IP/TCP', 'Monads', 'Memory Leaks', 'Heap'];

export const SearchBar: FC<Props> = (props) => {
  const { onClose, className, ...rest } = props;
  return (
    <div
      className={classNames('search-bar d-flex flex-column align-items-center', className)}
      {...rest}
    >
      <div className="d-flex search-bar__form align-items-center w-100 mt-5 px-5">
        <Icon
          className="mr-5 d-flex align-items-center search-bar__search-icon"
          iconSize={30}
          color="white"
          icon="search"
        />
        <input placeholder="Search" className="search-bar__input" />
        <Icon
          onClick={onClose}
          className="ml-auto d-flex align-items-center search-bar__close-icon"
          iconSize={30}
          color="white"
          icon="cross"
        />
      </div>
      <div className="d-flex flex-column search-bar__result mt-5 w-100">
        <div className="w-100 d-flex justify-content-between">
          <div className="d-flex flex-column search-bar__nodes col-4">
            <div className="d-flex flex-column mb-5">
              <p className="search-bar__title w-50 d-flex">Themes</p>
              <ul className="search-bar__nodes-list d-flex flex-column">
                {categories.map((n) => (
                  <div key={n} className="d-flex search-bar__item mb-2 p-3">
                    <Icon icon="git-branch" color="white" iconSize={16} className="mr-3" />
                    <p>{n}</p>
                  </div>
                ))}
              </ul>
              <Link to="/main/learn/1">
                <p className="search-bar__node-link">Check all</p>
              </Link>
            </div>
            <div>
              <p className="d-flex w-75 mb-4 search-bar__title">Learning Nodes</p>
              <div className="d-flex flex-wrap">
                {nodes.map((n) => (
                  <div key={n} className="d-flex search-bar__item search-bar__node-item m-2">
                    <Icon
                      icon="git-commit"
                      color="white"
                      iconSize={16}
                      className="mr-3 d-flex align-items-center"
                    />
                    <span>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-6">
            <p className="search-bar__title w-50">Road Maps</p>
            <ul className="search-bar__nodes-list d-flex flex-column mt-4 px-0">
              {roadmap.map((n) => (
                <div key={n} className="d-flex search-bar__item search-bar__road-map mb-4 p-3">
                  <Icon icon="map-create" color="white" iconSize={16} className="mr-3" />
                  <p>{n}</p>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
