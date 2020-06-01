import { RST, RST_RecursiveSOGTree_nodeContents as Content } from '../__generated__/RST';

const parseContent = (contentIds: string[], content: Record<string, Content>) => {
  const orderingData: Record<string, { order: number; value: string }[]> = {};
  const data = Object.fromEntries(
    contentIds
      .map((n) => {
        const { key = '', value = '', order } = content[n];
        if (order) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          orderingData[key!] = [...(orderingData[key] || []), { order, value }].sort(
            ({ o1 }, { o2 }) => o1 - o2,
          );
          return [];
        }
        return [key, value];
      })
      .filter((n) => Boolean(n[0] && n[1])),
  );
  const contentResult: Record<string, string[]> = {};
  Object.keys(orderingData).forEach((c) => {
    const v = orderingData[c].map((n) => n.value);
    contentResult[c] = v;
  });

  return {
    ...data,
    ...contentResult,
  };
};

export const parseRST = (data: RST['RecursiveSOGTree']) => {
  if (data) {
    const content = Object.fromEntries(data.nodeContents!.map((n) => [n!.uuid, n!]));
    return data.nodes?.map((n) => {
      const { uuid: id = '' } = n!;
      const childes = data.nodeRels!.filter((m) => m!.from === id).map((k) => k!.to || '');
      const parent = data.nodeRels!.find((m) => m!.to === id)?.from || '';
      const relatedContent = data
        .nodeContentRels!.filter((m) => m!.from === id)
        .map((k) => k!.to || '');
      return {
        id,
        childes,
        parentId: parent,
        root: Boolean(!parent),
        content: parseContent(relatedContent, content),
      };
    });
  }
  return null;
};
