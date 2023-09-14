import { Inter } from 'next/font/google';

import { Filters } from '@/types/filters';
import { AIFilter } from '@/components/AIFilter';

const inter = Inter({ subsets: ['latin'] });

export default function MovieList() {
  const onFilterChange = (filters: Filters) => {
    // Implement me! What should happen when the filters change?
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-start px-24 py-12 ${inter.className}`}>
      <h1 className="text-4xl font-bold text-center pb-12">Movies!</h1>
      <AIFilter onFilterChange={onFilterChange} />
    </main>
  );
}
