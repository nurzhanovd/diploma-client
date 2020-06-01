import { declareAction, declareAtom } from '@reatom/core';

type Content = {
  uuid: string;
  type: string;
  key: string;
  value: string;
  order: number;
  orderForField: string;
};

type Relation = Record<string, Record<string, string>>;

export const addContent = declareAction<Record<string, Content>>();
export const content = declareAtom<Record<string, Content>>('Content', {}, (on) => [
  on(addContent, (state, payload) => ({
    ...state,
    ...payload,
  })),
]);

export const addRelation = declareAction<Relation>();
export const contentRelation = declareAtom<Relation>('contentRelation', {}, (on) => [
  on(addRelation, (state, payload) => ({
    ...state,
    ...payload,
  })),
]);
