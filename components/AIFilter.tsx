import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAIFilters } from '@/react-query/ai';
import { Filters } from '@/types/filters';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { Input } from './Input';
import { Spinner } from './Spinner';

const examplePrompts = [
  'Horror movies from the 80s',
  'Action and adventure movies in the 20th century',
  'Drama movies in the past decade',
];

export const AIFilter = ({ onFilterChange }: { onFilterChange: (filters: Filters) => void }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const { mutateAsync, isLoading: isAILoading, isError: isAIError } = useAIFilters();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    if (!inputValue) {
      router.push('/');
      return;
    }
    mutateAsync({ prompt: inputValue })
      .then((res) => {
        if (res.error) {
          setErrorMessage('Your prompt does not yield meaningful filters');
          return;
        }
        if (res.filters) {
          onFilterChange(res.filters);
          setInputValue('');
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <form className="flex flex-col gap-3 mt-2 mb-4" onSubmit={handleSubmit}>
        <legend className="sr-only">AI Filter</legend>
        <div className="flex gap-2 justify-center">
          <div className="w-full max-w-xl">
            <Input
              id="AIFilter"
              type="text"
              label="AI Filter"
              placeholder="Ask AI to filter the movies for you!"
              disabled={isAILoading}
              value={inputValue}
              inputMode="text"
              onChange={(e) => setInputValue(e.currentTarget.value)}
            />
          </div>
          <button type="submit" disabled={isAILoading}>
            <PaperAirplaneIcon
              className={classNames({ 'text-gray-700': !isAILoading, 'text-gray-400': isAILoading }, 'h-5 w-5')}
            ></PaperAirplaneIcon>
          </button>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <div className="text-xs font-medium text-gray-900">Try one of these:</div>
          {examplePrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              className="text-xs text-gray-500 hover:text-gray-900 hover:underline"
              onClick={() => setInputValue(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      </form>
      {isAILoading || isAIError || errorMessage ? (
        <div className="flex justify-center text-red-500 text-sm">
          {isAILoading && <Spinner />}
          {(isAIError || errorMessage) && `${errorMessage}, please try again!`}
        </div>
      ) : null}
    </>
  );
};
