import React, { useEffect } from 'react';
import Router from 'router';
import { combine, createStore } from '@reatom/core';
import { context } from '@reatom/react';
import { connectReduxDevtools } from '@reatom/debug';

import { expandableCourse } from 'store/courses';

const store = createStore(combine({ expandableCourse }));

export const App = () => {
  useEffect(() => connectReduxDevtools(store), []);

  return (
    <context.Provider value={store}>
      <Router />
    </context.Provider>
  );
}
