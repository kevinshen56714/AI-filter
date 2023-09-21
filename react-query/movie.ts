import { useQuery } from 'react-query';

import { Filters } from '@/types/filters';
import { Movie } from '@/types/movie';

export const useGetMovies = (filters: Filters) => {
  const params = new URLSearchParams(filters as Record<string, string>);
  return useQuery<Movie[], Error>(
    ['movies', filters],
    () => fetch(`/api/movies?${params.toString()}`).then((response) => response.json()),
    {
      refetchOnWindowFocus: false,
    },
  );
};
