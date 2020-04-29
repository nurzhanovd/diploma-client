import { ClassName } from 'core/components/types';

export type Props = {
  title: string;
  onClick: () => void;
} & ClassName;
