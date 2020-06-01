type Content = {
  key?: string | null;
  value?: any;
};

export const findValueInContent = (key: string) => <T>(content?: (Content | null)[]): T | null => {
  if (content) {
    return content.find((n) => n?.key === key)?.value;
  }
  return null;
};

export const findTitle = findValueInContent('title');
export const findDescription = findValueInContent('title');
