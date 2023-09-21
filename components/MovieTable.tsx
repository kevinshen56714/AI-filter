import classNames from 'classnames';
import Link from 'next/link';

import { Tooltip } from '@/components/Tooltip';
import { Filters } from '@/types/filters';
import { Movie } from '@/types/movie';

import { Badge } from './Badge';

export const MovieTable = ({
  movies,
  filters,
  onFilterChange,
}: {
  movies: Movie[];
  filters: Filters;
  onFilterChange: (filter: Filters) => void;
}) => {
  const handleBadgeClick = (value: string) => {
    //if value is not in genres, add it, else remove it
    if (filters.genres?.includes(value)) {
      filters.genres = filters.genres?.filter((genre) => genre !== value);
    } else {
      filters.genres = [...(filters.genres || []), value];
    }
    onFilterChange(filters);
  };

  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-300 bg-gray-50 shadow-sm">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="border-b bg-gray-50 text-gray-700">
          <tr>
            {/* We apply font-semibold in every <th> to overwrite its automatically-applied font-bold */}
            <th className="py-2 px-6 font-semibold">Title</th>
            <th className="py-2 px-6 font-semibold">
              <div className="flex items-center gap-1">Year</div>
            </th>
            <th className="py-2 px-6 font-semibold">
              <div className="flex items-center gap-1">
                Genres
                <Tooltip>Click on any badges to apply filtering</Tooltip>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {!movies.length && (
            <tr>
              <td colSpan={3} className="bg-white py-5 text-center">
                No matching movies found
                <div className="font-bold underline">
                  <Link href={'/'}>Reset</Link>
                </div>
              </td>
            </tr>
          )}
          {movies.map((movie, i) => {
            const { slug, title, year, genres } = movie;
            const evenRow = i % 2 === 0;
            return (
              <tr
                key={i}
                className={classNames({
                  'bg-white': evenRow,
                  'bg-gray-50': !evenRow,
                  'border-b shadow-sm': open,
                })}
              >
                <td className="max-w-xs lg:max-w-none py-2 px-6 truncate whitespace-nowrap text-left font-medium text-cyan-600 hover:underline">
                  <Link href={`/movie/${slug}`}>{title}</Link>
                </td>
                <td className="py-2 px-6">
                  <div className="flex flex-wrap">{year}</div>
                </td>
                <td className="py-2 px-6">
                  <div className="flex flex-wrap">
                    {genres.map((genre, i) => (
                      <Badge
                        key={i}
                        value={genre}
                        highlighted={filters.genres?.includes(genre)}
                        onClickCallBack={handleBadgeClick}
                      />
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
