import { declareAction, declareAtom } from '@reatom/core';

type Node = {
  id: string;
  parentId?: string;
  root?: boolean;
};

type Relation = Record<string, ReadonlyArray<string>>;

export const addNode = declareAction<Record<string, Node>>();
export const nodes = declareAtom<Record<string, Node>>('Node', {}, (on) => [
  on(addNode, (state, payload) => ({
    ...state,
    ...payload,
  })),
]);

export const addRelation = declareAction<Relation>();
export const nodeRelations = declareAtom<Relation>('NodeRelation', {}, (on) => [
  on(addRelation, (state, payload) => ({
    ...state,
    ...payload,
  })),
]);
