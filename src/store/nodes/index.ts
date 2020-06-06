import { declareAction, declareAtom } from '@reatom/core';
import mock from 'components/pages/CategoryPage/mock';

export type ID = number | string;

export type Node = {
  id: ID;
  parentId?: ID;
  root?: boolean;
  childes: ID[];
  title: string;
  completed?: boolean;
  tableOfContents: string[];
};

export type Relation = Record<string, ReadonlyArray<string>>;

export const addNodesAction = declareAction<Record<string, Node>>();
export const nodesAtom = declareAtom<Record<string, Node>>('Node', {}, (on) => [
  on(addNodesAction, (state, payload) => ({
    ...state,
    ...payload,
  })),
]);
