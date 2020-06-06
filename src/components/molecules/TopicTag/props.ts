import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  text: string;
  isComplete?: boolean;
};
