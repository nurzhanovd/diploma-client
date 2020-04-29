import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  nodeId: number | string;
  breadcrumb: string[];
  text: string;
  ref: any;
};
