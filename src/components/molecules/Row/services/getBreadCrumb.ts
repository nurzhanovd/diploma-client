import { Data, Payload } from 'components/organisms/ExpandableCourse';

export const getBreadCrumb = (payload: Payload, { parentId, title }: Data) => {
  const queue = [title];
  if (parentId) {
    let t = payload.data[parentId];
    while (t.parentId) {
      queue.push(t.title);
      t = payload.data[t.parentId];
    }
    queue.push(t.title);
  }

  return queue.reverse();
};
