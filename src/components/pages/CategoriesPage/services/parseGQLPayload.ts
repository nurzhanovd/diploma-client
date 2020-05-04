import { Props } from 'components/molecules/CategoryCard';
import { Courses } from '../__generated__/Courses';

export const parseGQLPayload = (data: Courses | undefined): Props[] => {
  return (
    data?.SOG?.map((r) => ({
      id: r!.uuid!,
      text: r!.contents!.find((n) => n?.key === 'title')?.value || '',
      description: r!.contents!.find((n) => n?.key === 'description')?.value || '',
      image: '',
    })) || []
  );
};
