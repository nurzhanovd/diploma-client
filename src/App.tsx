import React, { useEffect } from 'react';
import Router from 'router';
import { createStore } from '@reatom/core';
import { context } from '@reatom/react';
import { connectReduxDevtools } from '@reatom/debug';

const store = createStore();

export const App = () => {
  useEffect(() => connectReduxDevtools(store), []);

  return (
    <context.Provider value={store}>
      <Router />
    </context.Provider>
  );
}
