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

type RoadMapNode = {
  type: 'Roadmap';
  title: string;
  id: ID;
  childes: ID[];
  parentId?: ID;
};

type UnionNode = RoadMapNode | ({ type: 'Node' } & Node);

type RoadMap = {
  data: Record<string, UnionNode>;
  root?: ID;
};

export const addNodesToRoadMapAction = declareAction<Record<ID, RoadMapNode>>();
export const addRootNodeAction = declareAction<RoadMapNode>();
export const changeRoadMapTitleAction = declareAction<{ id: ID; title: string }>();
export const addNodeToRoadmapNodeAction = declareAction<{ node: Node; roadmapId: ID }>();
export const addNewRoadMapNodeAction = declareAction<{ parentRoadMap: ID }>();
export const deleteNodeFromRoadMapAction = declareAction<ID>();
export const roadMapNodesAtom = declareAtom<RoadMap>('Node', { data: {} }, (on) => [
  on(addRootNodeAction, (state, node) => ({
    root: node.id,
    data: {
      [node.id]: { ...node },
    },
  })),
  on(addNodesToRoadMapAction, (state, payload) => ({
    ...state,
    ...payload,
  })),
  on(changeRoadMapTitleAction, (state, { id, title }) => ({
    ...state,
    data: {
      ...state.data,
      [id]: {
        ...state.data![id],
        title,
      },
    },
  })),
  on(addNodeToRoadmapNodeAction, (state, { node, roadmapId }) => {
    const { childes: oldChildes, ...rest } = state.data![roadmapId];
    const childes = [...oldChildes, node.id];
    return {
      ...state,
      data: {
        [roadmapId]: {
          ...rest,
          childes,
        },
        [node.id]: {
          ...node,
          type: 'Node',
          parentId: roadmapId,
        },
      },
    };
  }),
  on(addNewRoadMapNodeAction, (state, { parentRoadMap }) => {
    const id = uuid();
    const { childes: oldChildes, ...rest } = state.data![parentRoadMap];
    const childes = [...oldChildes, id];
    return {
      ...state,
      data: {
        ...state.data,
        [parentRoadMap]: {
          ...rest,
          childes,
        },
        [id]: {
          id,
          title: 'New Roadmap Node',
          childes: [],
          parentId: parentRoadMap,
          type: 'Roadmap',
        },
      },
    };
  }),
  on(deleteNodeFromRoadMapAction, (state, nodeId) => {
    const { parentId } = state.data![nodeId];
    const { childes, ...rest } = state.data![parentId!] as RoadMapNode;
    return {
      ...state,
      data: {
        ...state.data,
        [parentId!]: {
          ...rest,
          childes: childes.filter((n) => n !== nodeId),
        },
      },
    };
  }),
]);
