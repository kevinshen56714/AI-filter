import { HTMLProps } from 'react';

export const Input = ({ id, label, ...delegated }: HTMLProps<HTMLInputElement> & { label: string }): JSX.Element => {
  return (
    <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-cyan-600 focus-within:ring-1 focus-within:ring-cyan-600">
      <label
        htmlFor={id}
        className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
      >
        {label}
      </label>

      <input
        {...delegated}
        id={id}
        className="w-full block border-0 p-0 text-xs text-gray-900 bg-transparent placeholder-gray-400 focus:ring-0 focus:outline-none sm:text-sm"
      />
    </div>
  );
};
