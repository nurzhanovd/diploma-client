import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  nodeId: string | number;
  text: string;
  breadCrumb: string[];
};
