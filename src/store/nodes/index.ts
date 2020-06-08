import { declareAction, declareAtom } from '@reatom/core';
import { v4 as uuid } from 'uuid';

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

export type RoadMapNode = {
  type: 'Roadmap';
  title: string;
  id: ID;
  childes: ID[];
  next: ID[];
  nodes: ID[];
  parentId?: ID;
};

type Union = RoadMapNode | ({ type: 'Node' } & Node);

export const addNodesToRoadMapAction = declareAction<Record<ID, RoadMapNode>>();
export const changeRoadMapTitleAction = declareAction<{ id: ID; title: string }>();
export const addNodeToRoadmapNodeAction = declareAction<{ node: Node; roadmapId: ID }>();
export const addNewRoadMapNodeAction = declareAction<{ parentRoadMap: ID }>();
export const deleteNodeFromRoadMapAction = declareAction<ID>();
export const roadMapNodesAtom = declareAtom<Record<string, Union>>(
  'Node',
  {
    1: {
      type: 'Roadmap',
      title: 'Roadmap',
      id: 1,
      childes: [],
      next: [],
      nodes: [],
    },
  },
  (on) => [
    on(addNodesToRoadMapAction, (state, payload) => ({
      ...state,
      ...payload,
    })),
    on(changeRoadMapTitleAction, (state, { id, title }) => ({
      ...state,
      [id]: {
        ...state[id],
        title,
      },
    })),
    on(addNodeToRoadmapNodeAction, (state, { node, roadmapId }) => {
      const { childes: oldChildes, nodes, ...rest } = state[roadmapId] as RoadMapNode;
      const childes = [...oldChildes, node.id];
      return {
        ...state,
        [roadmapId]: {
          ...rest,
          childes,
          nodes: [...nodes, node.id],
        },
        [node.id]: {
          ...node,
          type: 'Node',
          parentId: roadmapId,
        },
      };
    }),
    on(addNewRoadMapNodeAction, (state, { parentRoadMap }) => {
      const id = uuid();
      const { childes: oldChildes, next, ...rest } = state[parentRoadMap] as RoadMapNode;
      const childes = [...oldChildes, id];
      return {
        ...state,
        [parentRoadMap]: {
          ...rest,
          childes,
          next: [...next, id],
        },
        [id]: {
          id,
          title: 'New Roadmap Node',
          childes: [],
          nodes: [],
          next: [],
          parentId: parentRoadMap,
          type: 'Roadmap',
        },
      };
    }),
    on(deleteNodeFromRoadMapAction, (state, nodeId) => {
      const { parentId } = state[nodeId];
      const { childes, ...rest } = state[parentId!] as RoadMapNode;
      return {
        ...state,
        [parentId!]: {
          ...rest,
          childes: childes.filter((n) => n !== nodeId),
        },
      };
    }),
  ],
);
