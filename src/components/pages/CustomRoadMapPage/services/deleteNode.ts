import { Data, Payload } from 'components/organisms/ExpandableCourse';

export const deleteNode = (payload: Payload, node: Data): Payload => {
  const { parentId } = node;

  if (parentId) {
    const { [node.id]: deletedNode, [parentId]: parent, ...rest } = payload.data;
    const nodeChildes = deletedNode.childes;
    const childes = parent.childes.filter((n) => n !== deletedNode.id).concat(nodeChildes);
    return {
      ...payload,
      data: {
        ...rest,
        [parentId]: {
          ...parent,
          childes,
        },
      },
    };
  }
  return payload;
};
