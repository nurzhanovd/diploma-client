import { HTMLAttributes } from 'react';

type Content = {
  text: string;
  onClick: () => void;
};

export type Props = HTMLAttributes<HTMLDivElement> & {
  contents: Content[];
  activeContentIndex: number;
};
