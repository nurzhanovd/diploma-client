import { QueryCategories_Node as Payload } from '../__generated__/QueryCategories';

export const parseGQLPayload = (data: Payload | null) => {
  if (data) {
    return {
      id: data?.uuid || '',
      text: data?.title || '',
      description: data?.description || '',
      image: data?.image || '',
    };
  }
  return {
    id: '',
    text: '',
    description: '',
    image: '',
  };
};
