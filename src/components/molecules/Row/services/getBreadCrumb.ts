import { Data, Payload } from 'components/organisms/ExpandableCourse';

export const getBreadCrumb = (payload: Payload, current: Data) => {
  const queue = [current.title];
  if (current.parentId) {
    let t = payload.data[current.parentId];
    while (t.parentId) {
      queue.push(t.title);
      t = payload.data[t.parentId];
    }
    queue.push(t.title);
  }

  return queue.reverse();
};
