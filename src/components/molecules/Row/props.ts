import { Payload, ID, Data } from 'components/organisms/ExpandableCourse';

export type Props = {
  current: Data;
  payload: Payload;
  onClick: (id: number | string) => void;
  isOpen: (id: ID) => boolean;
  isRoot: boolean;
  className?: string;
  children?: (current: Data, Payload: Payload) => JSX.Element;
};
