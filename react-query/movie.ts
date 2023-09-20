import { useQuery } from 'react-query';

import { Filters } from '@/types/filters';
import { Movie } from '@/types/movie';

const fetchMovie = async (filters: Filters): Promise<Movie[]> => {
  // convert filters to query string using URLSearchParams
  const params = new URLSearchParams(filters as Record<string, string>);
  const res = await fetch(`/api/movies?${params.toString()}`);
  return res.json();
};

export const useGetMovies = (filters: Filters) => {
  console.log('useGetMovies called');
  return useQuery<Movie[], Error>(['movies', filters], () => fetchMovie(filters), {
    staleTime: 1000 * 60,
  });
};
