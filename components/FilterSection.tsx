import classNames from 'classnames';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  return (
    <Disclosure as="div" className="border-b border-gray-300" defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className="px-4 py-2">
          <Disclosure.Button className="my-2 flex w-full items-center justify-between font-semibold">
            <span>{title}</span>
            <ChevronDownIcon className={classNames({ 'rotate-180 transform': open }, 'h-4 w-4')} />
          </Disclosure.Button>
          <Disclosure.Panel className="max-h-64 overflow-y-auto">{children}</Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
