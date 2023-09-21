import { useMutation } from 'react-query';

import { FilterResponse } from '@/types/filters';

export const useAIFilters = () => {
  return useMutation<FilterResponse, Error, { prompt: string }>(({ prompt }) =>
    fetch('/api/ai', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        prompt,
      }),
    }).then((response) => response.json()),
  );
};
