import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React, { FC, useEffect, useMemo, useState } from 'react';
import deb from 'debounce';
import { Icon } from '@blueprintjs/core';
import { useLazyQuery } from '@apollo/react-hooks';
import { fetchQuery } from './index.gql';
import { Props } from './props';
import './styles.scss';

import { SearchBar as Data, SearchBarVariables } from './__generated__/SearchBar';

export const SearchBar: FC<Props> = (props) => {
  const { onClose, className, ...rest } = props;
  const [searchText, setSearchText] = useState('');
  const [fetchSearch, { data }] = useLazyQuery<Data, SearchBarVariables>(fetchQuery);
  const debounce = deb((text: string) => {
    fetchSearch({ variables: { text: text.trim() } });
  }, 250);

  const [branch, leaf] = useMemo(() => {
    if (data?.Branch && data.Leaf) {
      const br =
        data.Branch.map((n) => ({
          id: n?.uuid || '',
          title: n?.title || '',
        })) || [];
      const lf =
        data.Leaf.map((n) => ({
          id: n?.uuid || '',
          title: n?.title || '',
        })) || [];
      return [br, lf];
    }
    return [[], []];
  }, [data]);

  useEffect(() => {
    debounce(searchText);
  }, [searchText]);

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
        <input
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          className="search-bar__input"
        />
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
              <p className="search-bar__title w-50 d-flex">Nodes</p>
              <ul className="search-bar__nodes-list d-flex flex-column">
                {leaf.length ? (
                  leaf.map((n) => (
                    <Link to={`/main/learn/${n.id}`}>
                      <div onClick={onClose} key={n.id} className="d-flex search-bar__item mb-2 p-3">
                        <Icon icon="git-commit" color="white" iconSize={16} className="mr-3" />
                        <p>{n.title}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="d-flex search-bar__item search-bar__road-map mb-4 p-3">
                    <Icon className="mr-3" icon="git-commit" color="white" iconSize={16} />
                    <p>No Data</p>
                  </div>
                )}
              </ul>
            </div>
          </div>
          <div className="col-6">
            <p className="search-bar__title w-50">Learn: </p>
            <ul className="search-bar__nodes-list d-flex flex-column mt-4 px-0">
              {branch.length ? (
                branch.map((n) => (
                  <Link to={`/main/learn/${n.id}`}>
                    <div onClick={onClose} key={n.id} className="d-flex search-bar__item search-bar__road-map mb-4 p-3">
                      <Icon icon="git-branch" color="white" iconSize={16} className="mr-3" />
                      <p>{n.title}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="d-flex search-bar__item search-bar__road-map mb-4 p-3">
                  <Icon className="mr-3" icon="git-branch" color="white" iconSize={16} />
                  <p>No Data</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
