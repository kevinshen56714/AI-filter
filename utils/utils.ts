import { useSearchParams } from 'next/navigation';

import { Filters } from '@/types/filters';

export const useFilterParams = () => {
  const searchParams = useSearchParams();
  const entries = searchParams.entries();
  const filterObj = Object.fromEntries(entries) as Filters;

  if (filterObj.genres) {
    const genresStr = searchParams.get('genres') as string;
    filterObj.genres = genresStr.split(',');
  }
  return filterObj;
};
