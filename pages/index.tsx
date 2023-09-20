import { Inter } from 'next/font/google';

import { AIFilter } from '@/components/AIFilter';
import mockMovies from '@/json/movies.json';
import { Filters } from '@/types/filters';
import { Movie } from '@/types/movie';

const inter = Inter({ subsets: ['latin'] });

export default function MovieList() {
  const onFilterChange = (filters: Filters) => {
    // Implement me! What should happen when the filters change?
  };

  // Use our own movie type
  const movies = mockMovies as Movie[];

  return (
    <main className={`flex min-h-screen flex-col items-center justify-start px-24 py-12 ${inter.className}`}>
      <h1 className="text-4xl font-bold text-center pb-12">Movies!</h1>
      {movies.map((movie) => (
        <p key={movie.slug}>{movie.title}</p>
      ))}
      <AIFilter onFilterChange={onFilterChange} />
    </main>
  );
}
