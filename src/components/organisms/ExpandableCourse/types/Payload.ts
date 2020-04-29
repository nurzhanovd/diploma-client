export type ID = number | string;

export type Data = {
  id: number | string;
  title: string;
  parentId?: ID;
  childes: ID[];
};

export type Payload = {
  root: ID;
  data: Record<ID, Data>;
};
