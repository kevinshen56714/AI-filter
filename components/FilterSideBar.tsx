import { useEffect, useState } from 'react';

import { Badge } from '@/components/Badge';
import { FilterSection } from '@/components/FilterSection';
import { Input } from '@/components/Input';
import { Filters } from '@/types/filters';
import { XCircleIcon } from '@heroicons/react/24/outline';

export const FilterSideBar = ({
  filters,
  genreCounts,
  yearRange,
  onFilterChange,
}: {
  filters: Filters;
  genreCounts: { [key: string]: number };
  yearRange: number[];
  onFilterChange: (filters: Filters) => void;
}) => {
  const [minYear, setMinYear] = useState<number>(NaN);
  const [maxYear, setMaxYear] = useState<number>(NaN);

  const handleBadgeClick = (value: string) => {
    //if value is not in genres, add it, else remove it
    if (filters.genres?.includes(value)) {
      filters.genres = filters.genres?.filter((genre) => genre !== value);
    } else {
      filters.genres = [...(filters.genres || []), value];
    }
    onFilterChange(filters);
  };

  useEffect(() => {
    setMinYear(filters.startYear || NaN);
    setMaxYear(filters.endYear || NaN);
  }, [filters]);

  const handleYearSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filters.startYear = minYear;
    filters.endYear = maxYear;
    onFilterChange(filters);
  };

  const getInputValue = (value: number | undefined): string =>
    value === undefined || isNaN(value) ? '' : value.toString();

  return (
    <div className="h-fit rounded-t-lg border border-gray-300 bg-gray-50 text-sm font-bold text-gray-900 shadow-sm">
      {filters.genres?.length ? (
        <div className="p-4 pb-2">
          <div>Current genres:</div>
          <div className="mt-3 flex flex-wrap">
            {filters.genres &&
              filters.genres.map((genre, i) => (
                <Badge key={i} value={genre} highlighted onClickCallBack={handleBadgeClick}>
                  <XCircleIcon className="h-5 w-5"></XCircleIcon>
                </Badge>
              ))}
          </div>
        </div>
      ) : null}
      <FilterSection title="Genres">
        {Object.keys(genreCounts).length > 0 ? (
          <div className="flex flex-wrap">
            {Object.keys(genreCounts).map((genre, i) => (
              <Badge
                key={i}
                value={genre}
                highlighted={filters.genres?.includes(genre)}
                onClickCallBack={handleBadgeClick}
              >
                <div className="my-[1px] flex h-4 w-4 items-center justify-center rounded-md bg-white/40">
                  {genreCounts[genre]}
                </div>
              </Badge>
            ))}
          </div>
        ) : null}
      </FilterSection>
      <FilterSection title="Year">
        <form className="flex flex-col gap-6 mt-2" onSubmit={handleYearSubmit}>
          <legend className="sr-only">Year Range</legend>
          <Input
            id="minYear"
            type="number"
            label="Min Year"
            placeholder={getInputValue(yearRange[0])}
            value={getInputValue(minYear)}
            inputMode="numeric"
            size={15}
            min={1900}
            max={new Date().getFullYear()}
            onChange={(e) => setMinYear(parseInt(e.currentTarget.value))}
          />
          <Input
            id="maxYear"
            type="number"
            label="Max Year"
            placeholder={getInputValue(yearRange[1])}
            value={getInputValue(maxYear)}
            inputMode="numeric"
            size={15}
            min={1900}
            max={new Date().getFullYear()}
            onChange={(e) => setMaxYear(parseInt(e.currentTarget.value))}
          />
          <button type="submit"></button>
        </form>
      </FilterSection>
    </div>
  );
};
