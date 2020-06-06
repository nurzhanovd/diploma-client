export type NodeId = string | number;

type RenderChildPayload = {
  isLeaf: boolean;
  isOpen: boolean;
  childes: NodeId[];
};

export type Props = {
  isRoot: boolean;
  className?: string;
  current: NodeId;
  onClick: (id: NodeId) => void;
  isOpen: (id: NodeId) => boolean;
  children: (id: NodeId, payload: RenderChildPayload) => JSX.Element;
  isLeaf: (id: NodeId) => boolean;
  getChildes: (id: NodeId) => NodeId[];
};
