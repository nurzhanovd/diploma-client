import { declareAction, declareAtom } from '@reatom/core';

export const nodeClick = declareAction<{ id: number | string }>();
export const expandableCourse = declareAtom<Set<string | number>>(
  'ExpandableCourse',
  new Set(),
  (on) => [
    on(nodeClick, (state, payload) => {
      if (state.has(payload.id)) {
        state.delete(payload.id);
      } else {
        state.add(payload.id);
      }

      return new Set(state);
    }),
  ],
);
