import { Node } from 'store/nodes';

export type ID = number | string;

export type Data = Node;

export type Payload = {
  root: ID;
  data: Record<ID, Node>;
};
