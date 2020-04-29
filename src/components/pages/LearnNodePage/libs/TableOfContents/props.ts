import { HTMLAttributes } from 'react';

type Content = {
  text: string;
  active: boolean;
  onClick: () => void;
};

export type Props = HTMLAttributes<HTMLDivElement> & {
  contents: Content[];
};
