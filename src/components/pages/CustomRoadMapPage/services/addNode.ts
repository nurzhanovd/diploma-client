import { Data, Payload } from 'components/organisms/ExpandableCourse';

export const addNode = (payload: Payload, node: Data, target: number | string): Payload => ({
  ...payload,
  data: {
    ...payload.data,
    [target]: {
      ...payload.data[target],
      childes: [...payload.data[target].childes, node.id],
    },
    [node.id]: node,
  },
});
