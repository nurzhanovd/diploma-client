import { Node } from '../__generated__/Node';

export const parseSog = (sog: Node) =>
  sog?.SOG?.map((n) => ({
    id: n?.uuid || '',
    title: n?.contents?.find((m) => m?.key === 'title')?.value || '',
  }));
