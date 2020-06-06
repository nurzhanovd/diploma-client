import { QueryCategories_Node as Payload } from '../__generated__/QueryCategories';

export const parseGQLPayload = (data: Payload | null) => {
  if (data) {
    return {
      id: data?.uuid || '',
      text: data?.title || '',
      description: 'description',
      image:
        'https://images.unsplash.com/photo-1542064923-b4bd6908c745?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
    };
  }
  return {
    id: '',
    text: '',
    description: '',
    image: '',
  };
};
