import { useSearchParams } from 'next/navigation';

import { Filters } from '@/types/filters';

export const useFilterParams = () => {
  const searchParams = useSearchParams();
  const entries = searchParams.entries();
  const filters = Object.fromEntries(entries) as Filters;

  if (filters.genres) {
    const genresStr = searchParams.get('genres') as string;
    filters.genres = genresStr.split(',');
  }
  return filters;
};
