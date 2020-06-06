import { HTMLAttributes } from 'react';

type Action = {
  text: string;
  onClick: (id: any) => void;
};

export type Props = HTMLAttributes<HTMLDivElement> & {
  nodeId: number | string;
  breadcrumb?: string[];
  text: string;
  actions: Action[];
  tableOfContents: string[];
  isComplete?: boolean;
};
