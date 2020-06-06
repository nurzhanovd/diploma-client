import { content } from 'core/mocks/content';
import { Node_Node as Node, Node as Payload } from '../__generated__/Node';

const markdownTemp = content[1].markdown;

export const parsePayload = (payload: Payload) => {
  if (payload && payload.Node && payload.Node[0]) {
    const node = payload.Node[0];
    const {
      uuid = '',
      title = '',
      childes: rawChildes = [],
      neighbours: rawNeighbours,
      parent: rawParent,
      isComplete,
    } = node;

    const parent = {
      nodeId: rawParent?.uuid || '',
      text: rawParent?.title || '',
      isComplete: Boolean(rawParent?.isComplete),
      tableOfContents: [],
    };

    const childes =
      rawChildes?.map((n) => ({
        text: n?.title || '',
        nodeId: n?.uuid || '',
        isComplete: Boolean(n?.isComplete),
        tableOfContents: [],
      })) || [];

    const neighbours =
      rawNeighbours?.map((n) => ({
        text: n?.title || '',
        nodeId: n?.uuid || '',
        isComplete: Boolean(n?.isComplete),
        tableOfContents: [],
      })) || [];
    const tableOfContents = markdownTemp.map((n) => n.split('\n').find(Boolean)!);
    return {
      title,
      uuid,
      content: markdownTemp,
      tableOfContents,
      parent,
      childes,
      neighbours,
      isComplete,
    };
  }
  return null;
};
