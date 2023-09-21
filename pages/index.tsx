import { Inter } from 'next/font/google';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { AIFilter } from '@/components/AIFilter';
import { DropdownMenu } from '@/components/DropdownMenu';
import { FilterSideBar } from '@/components/FilterSideBar';
import { MovieTable } from '@/components/MovieTable';
import { Spinner } from '@/components/Spinner';
import { useGetMovies } from '@/react-query/movie';
import { Filters } from '@/types/filters';
import { Movie } from '@/types/movie';
import { useFilterParams } from '@/utils/utils';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const inter = Inter({ subsets: ['latin'] });

enum sortByOptions {
  DEFAULT = 'Sort By',
  TITLE_A_Z = 'Title (A-Z)',
  TITLE_Z_A = 'Title (Z-A)',
  MOST_RECENT = 'Most Recent',
  LEAST_RECENT = 'Least Recent',
}

const sortMovies = (movies: Movie[], sortBy: string) => {
  if (sortBy === sortByOptions.TITLE_A_Z) {
    movies = movies.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
  } else if (sortBy === sortByOptions.TITLE_Z_A) {
    movies = movies.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1));
  } else if (sortBy === sortByOptions.MOST_RECENT) {
    movies = movies.sort((a, b) => (a.year < b.year ? 1 : -1));
  } else if (sortBy === sortByOptions.LEAST_RECENT) {
    movies = movies.sort((a, b) => (a.year < b.year ? -1 : 1));
  }
  return movies;
};

export default function MovieList() {
  const router = useRouter();
  const pathname = usePathname();
  const filters = useFilterParams();
  const { data: moviesData, isLoading: isMoviesLoading, isError: isMoviesError } = useGetMovies(filters);
  const [sortBy, setSortBy] = useState<string>(sortByOptions.DEFAULT);

  const movies = useMemo(() => sortMovies([...(moviesData || [])], sortBy), [moviesData, sortBy]);

  const genreCounts = useMemo(
    () =>
      movies?.reduce((acc, movie) => {
        movie.genres.forEach((genre) => {
          acc[genre] = acc[genre] ? acc[genre] + 1 : 1;
        });
        return acc;
      }, {} as { [key: string]: number }),
    [movies],
  );

  const yearRange = useMemo(() => {
    const years = movies?.map((movie) => movie.year);
    return years.length > 0 ? [Math.min(...years), Math.max(...years)] : [NaN, NaN];
  }, [movies]);

  const onFilterChange = (filters: Filters) => {
    if (filters.genres?.length === 0) {
      delete filters.genres;
    }
    if (!filters.startYear) {
      delete filters.startYear;
    }
    if (!filters.endYear) {
      delete filters.endYear;
    }
    const searchParams = new URLSearchParams(filters as Record<string, string>);
    const searchParamsString = searchParams.toString();
    const newUrl = pathname + (searchParamsString ? `?${searchParamsString}` : '');
    router.push(newUrl);
  };

  return (
    <main className={`mx-auto min-h-screen max-w-7xl py-8 px-2 sm:px-6 lg:px-20 ${inter.className}`}>
      <h1 className="text-4xl font-bold text-center">Movie Night 🌚</h1>

      <div className="flex justify-center mt-10">
        {isMoviesLoading && <Spinner />}
        {isMoviesError && 'Something went wrong while fetching movie data...'}
      </div>

      {movies && !isMoviesError && !isMoviesLoading && (
        <>
          <AIFilter onFilterChange={onFilterChange} />
          <div className="grid grid-cols-3 lg:grid-cols-4 lg:gap-x-6 mt-4">
            <div className="col-span-3 mb-2 flex items-end justify-between">
              <div className="text-sm text-gray-500">Showing {movies.length} movies</div>
              <DropdownMenu
                options={Object.values(sortByOptions)}
                selected={sortBy}
                onChangeCallback={setSortBy}
              ></DropdownMenu>
            </div>
            <div className="hidden lg:flex items-center gap-1 col-span-1 my-2 text-lg font-medium text-gray-900">
              <h2>Filter by</h2>
              <Link href={'/'}>
                <ArrowPathIcon className="h-5 w-5 text-gray-400"></ArrowPathIcon>
              </Link>
            </div>
            <div className="col-span-3">
              <MovieTable movies={movies} filters={filters} onFilterChange={onFilterChange} />
            </div>

            <div className="hidden lg:block col-span-1">
              <FilterSideBar
                filters={filters}
                genreCounts={genreCounts!}
                yearRange={yearRange}
                onFilterChange={onFilterChange}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
