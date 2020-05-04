import React, { useEffect } from 'react';
import Router from 'router';
import { combine, createStore } from '@reatom/core';
import { context } from '@reatom/react';
import { connectReduxDevtools } from '@reatom/debug';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from 'core/graphql';

import { expandableCourse } from 'store/courses';

const store = createStore(combine({ expandableCourse }));

export const App = () => {
  useEffect(() => connectReduxDevtools(store), []);

  return (
    <ApolloProvider client={client}>
      <context.Provider value={store}>
        <Router />
      </context.Provider>
    </ApolloProvider>
  );
};
