import React from 'react';
import { CompanyIcon } from '../../../atoms';

export const Footer: React.FC = () => {
  return (
    <div>
      <footer className=' dark:bg-gray-900 min-h-full'>
        <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <a className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'>
              <CompanyIcon className='w-8 h-8' />

              <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
                Vortex ticket
              </span>
            </a>
            <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
              <li>
                <a href='/events/all' className='hover:underline me-4 md:me-6 text-white'>
                  All events
                </a>
              </li>
              <li>
                <a href='/ticket/all' className='hover:underline me-4 md:me-6 text-white'>
                  All tickets
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline me-4 md:me-6 text-white'></a>
              </li>
              <li>
                <a href='/' className='hover:underline text-white'>
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
          <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
          <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            © 2024 Vortex ticket.
          </span>
        </div>
      </footer>
    </div>
  );
};
