import { findTitle, findDescription } from 'core/services/findValueInContent';
import { QueryCategories_SOG as Payload } from '../__generated__/QueryCategories';

export const parseGQLPayload = (data: Payload | null) => {
  if (data) {
    const contents = data?.contents || [];
    return {
      id: data?.uuid || '',
      text: findTitle<string>(contents) || '',
      description: findDescription<string>(contents) || '',
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
