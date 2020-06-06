import { content } from 'core/mocks/content';
import { TreeNode } from '../__generated__/TreeNode';

const markdownTemp = content[1].markdown;

const tableOfContents = markdownTemp.map((n) => n.split('\n').find(Boolean)!);

export const parseRST = (payload: TreeNode) => {
  const data = payload.TreeNode;
  if (data) {
    const completedNodes = payload.GetCompletedNodes?.map(n => n?.uuid || '') || [];
    return data.nodes?.map((n) => {
      const { uuid: id = '' } = n!;
      const childes = data.rels!.filter((m) => m!.from === id).map((k) => k!.to || '');
      const parent = data.rels!.find((m) => m!.to === id)?.from || '';

      return {
        id,
        childes,
        parentId: parent,
        root: Boolean(!parent),
        title: n?.title || '',
        completed: completedNodes.includes(id),
        tableOfContents,
      };
    });
  }
  return null;
};
