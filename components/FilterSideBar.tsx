import { useState } from 'react';

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
  const [minYear, setMinYear] = useState<number>(filters.startYear || NaN);
  const [maxYear, setMaxYear] = useState<number>(filters.endYear || NaN);

  const handleBadgeClick = (value: string) => {
    //if value is not in genres, add it, else remove it
    if (filters.genres?.includes(value)) {
      filters.genres = filters.genres?.filter((genre) => genre !== value);
    } else {
      filters.genres = [...(filters.genres || []), value];
    }
    onFilterChange(filters);
  };

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
        {!!yearRange[0] && !!yearRange[1] && (
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
        )}
      </FilterSection>
    </div>

    /* for small view */
    /* <div className="relative overflow-x-auto rounded-lg border border-gray-300 bg-gray-50 shadow-sm lg:hidden">
    <table className="w-full text-left text-sm text-gray-500">
        <thead className="border-b bg-gray-50 text-gray-700">
        <tr>
            <th scope="col" className="py-3 px-10 font-semibold">
            <div className="flex items-center gap-1">
                Jobs
                <Tooltip>Click on any badges to apply filtering</Tooltip>
            </div>
            </th>
        </tr>
        </thead>
        <tbody>
        {!jobs.length && (
            <tr>
            <td className="bg-white py-5 text-center">No matching jobs found</td>
            </tr>
        )}
        {jobs.map((job, i) => {
            const { bigTech, city, company, experience, hybrid, link, loc, remote, salary, skills, startup, title } =
            job;
            const evenRow = i % 2 === 0;
            const nonLangSkills = Object.keys(skills)
            .filter((type) => type !== SkillType.LANGUAGE)
            .reduce((acc, type) => [...acc, ...skills[type]], []);
            return (
            <Disclosure key={i}>
                {({ open }) => (
                <>
                    <tr
                    className={classNames({
                        'bg-white': evenRow,
                        'bg-gray-50': !evenRow,
                        'border-b shadow-sm': open,
                    })}
                    >
                    <td className="py-2 px-3">
                        <Disclosure.Button className="flex max-w-full items-center gap-3">
                        <div>
                            <ChevronRightIcon
                            className={classNames({ 'rotate-90 transform': open }, 'h-4 w-4 text-gray-700')}
                            />
                        </div>
                        <div className="truncate whitespace-nowrap text-left font-medium text-cyan-600 hover:underline">
                            {company}
                            <div className="flex items-center">
                            {bigTech && <Badge value="Big Tech" />}
                            {!bigTech && startup && <Badge value="Startup" />}
                            {remote && <Badge value="Remote" />}
                            {hybrid && <Badge value="Hybrid" />}
                            <p className="truncate whitespace-nowrap font-normal text-gray-900">{title}</p>
                            </div>
                            <div className="mt-1 flex items-center">
                            <MapPinIcon className="mr-1 h-4 w-4 text-gray-700" />
                            <p className="truncate whitespace-nowrap font-normal text-gray-900">
                                {cities.find((c) => c.city === city)?.name}
                            </p>
                            {experience && (
                                <div className="flex items-center">
                                <BriefcaseIcon className="ml-3 mr-1 h-4 w-4 text-gray-700" />
                                <p className="truncate whitespace-nowrap font-normal text-gray-900">
                                    {`${Array.isArray(experience) ? experience.join('-') : experience} years`}
                                </p>
                                </div>
                            )}
                            </div>
                        </div>
                        </Disclosure.Button>
                        {skills[SkillType.LANGUAGE].length ? (
                        <div className="my-1.5 ml-7 flex flex-wrap items-center">
                            <p className="mr-2 font-medium text-gray-900">Languages:</p>
                            {skills[SkillType.LANGUAGE].map((skill, i) => (
                            <Badge key={i} value={skill} onClickCallBack={handleFilterChange('skills')} />
                            ))}
                        </div>
                        ) : null}
                        {nonLangSkills.length ? (
                        <div className="my-1.5 ml-7 flex flex-wrap items-center">
                            <p className="mr-2 font-medium text-gray-900">Skills:</p>
                            {nonLangSkills.map((skill, i) => (
                            <Badge key={i} value={skill} onClickCallBack={handleFilterChange('skills')} />
                            ))}
                        </div>
                        ) : null}
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <Disclosure.Panel
                        className={classNames(
                            {
                            'bg-white': evenRow,
                            'bg-gray-50': !evenRow,
                            },
                            'border-b px-10 py-4 text-sm text-gray-500 shadow-sm',
                        )}
                        >
                        <div className="flex flex-col gap-1 text-base font-medium text-cyan-600">
                            {company}
                            <p className="text-gray-900">{title}</p>
                            <p className="text-sm font-normal text-gray-700">{loc}</p>
                            <p className="text-sm font-normal text-gray-700">{salary || 'No salary estimation'}</p>
                            <button
                            type="button"
                            className={classNames(
                                {
                                'bg-gray-50 hover:bg-gray-100': evenRow,
                                'bg-gray-100 hover:bg-gray-200': !evenRow,
                                },
                                'w-24 rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700',
                            )}
                            >
                            <a href={link} target="_blank" rel="noreferrer">
                                Job Post
                            </a>
                            </button>
                        </div>
                        </Disclosure.Panel>
                    </td>
                    </tr>
                </>
                )}
            </Disclosure>
            );
        })}
        </tbody>
    </table>
    </div> */
  );
};
