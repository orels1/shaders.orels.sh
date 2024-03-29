import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

type TableOfContents = Array<{
  id: string;
  title: string;
  children?: Array<{
    id: string;
    title: string;
  }>
}>;

export default function MobileToC({
  tableOfContents,
  className,
}: {
  tableOfContents: TableOfContents;
  className?: string;
}) {
  if (tableOfContents.length == 0) return null;

  return (
    <Menu as="div" className={clsx('relative flex mb-4 w-ful text-left', className)}>
      <Menu.Button className="flex w-full justify-between gap-x-1.5 rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm text-gray-900 dark:text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 hover:bg-gray-50">
        On This Page
        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 -translate-y-2"
        enterTo="transform opacity-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 top-10 z-10 mt-2 w-full origin-top-middle rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black dark:ring-slate-700 ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {tableOfContents.map((item) => (
              <Menu.Item key={item.id}>
                {({ active }) => (
                  <a
                    href={`#${item.id}`}
                    className={clsx(
                      active ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-slate-100' : 'text-gray-700 dark:text-slate-100',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {item.title}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
