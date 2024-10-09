import React from 'react';
import { Link } from 'react-router-dom';
import { CompanyIcon } from '../../../atoms';

export const Welcome: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-white'>
      <div className='text-center'>
        <CompanyIcon className='w-60 h-60 animate-spin-slow' />
        <h1 className='text-5xl font-bold mb-4'>Vortex Ticket</h1>
        <p className='text-xl'>Welcome to the best ticketing platform!</p>
        <Link to='/login' className='mr-4 text-white hover:no-underline hover:font-semibold'>
          Login
        </Link>
        <Link to='/register' className='text-white hover:no-underline hover:font-semibold'>
          Register
        </Link>
      </div>
    </div>
  );
};
