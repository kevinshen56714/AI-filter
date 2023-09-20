import { Inter } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';

import { AIFilter } from '@/components/AIFilter';
import { useGetMovies } from '@/react-query/movie';
import { Filters } from '@/types/filters';
import { useFilterParams } from '@/utils/utils';

const inter = Inter({ subsets: ['latin'] });

export default function MovieList() {
  const router = useRouter();
  const pathname = usePathname();
  const filters = useFilterParams();
  const { data: movies, isLoading: isMoviesLoading, isError: isMoviesError } = useGetMovies(filters);

  const onFilterChange = (filters: Filters) => {
    // Implement me! What should happen when the filters change?
    // const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    // current.set('filters', JSON.stringify(filters));

    router.push(`${pathname}?${filters.toString()}`);
  };

  if (isMoviesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-start px-24 py-12 ${inter.className}`}>
      <h1 className="text-4xl font-bold text-center pb-12">Movies!</h1>
      <p>Number of movies: {movies?.length}</p>
      {movies?.map((movie) => (
        <p key={movie.slug}>{movie.title}</p>
      ))}
      <AIFilter onFilterChange={onFilterChange} />
    </main>
  );
}
