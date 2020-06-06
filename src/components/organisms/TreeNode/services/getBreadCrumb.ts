import { Node } from 'store/nodes';

export const getBreadCrumb = (payload: Record<string, Node>, { parentId, title }: Node) => {
  const queue = [title];
  if (parentId) {
    let t = payload[parentId];
    while (t.parentId) {
      queue.push(t.title);
      t = payload[t.parentId];
    }
    queue.push(t.title);
  }

  return queue.reverse();
};
