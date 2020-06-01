import React, { useEffect } from 'react';
import Router from 'router';
import { combine, createStore } from '@reatom/core';
import { context } from '@reatom/react';
import { connectReduxDevtools } from '@reatom/debug';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from 'core/graphql';

import { expandableCourse } from 'store/courses';
import { content, contentRelation } from 'store/content';
import { nodeRelations, nodes } from 'store/nodes';

const store = createStore(
  combine({ expandableCourse, nodeRelations, nodes, content, contentRelation }),
);

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
