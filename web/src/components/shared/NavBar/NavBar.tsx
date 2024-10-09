import React, { useState } from 'react';
import { Disclosure, Input } from '@headlessui/react';
import { CompanyIcon, NavBarButton } from '../../../atoms';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogOut = () => {
    logout();
    navigate('/welcome');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div>
      <Disclosure as='nav' className='bg-gray-800'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center'>
              <div className='flex-shrink-0 pt-4'>
                <CompanyIcon className='w-10 h-10' />
              </div>
              {user && (
                <div className='hidden md:flex ml-10 space-x-4 no-underline'>
                  <NavBarButton to='/' className='no-underline'>
                    Home
                  </NavBarButton>
                </div>
              )}
            </div>
            <div className='flex items-center space-x-4 flex-grow  ml-20 mr-20'>
              {user && (
                <form onSubmit={handleSearch} className='flex-grow'>
                  <Input
                    type='text'
                    placeholder='Search events...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='bg-gray-700 text-white rounded-md px-3 py-2 w-full'
                  />
                </form>
              )}
            </div>
            <div className='flex items-center space-x-4'>
              {user ? (
                <>
                  <NavBarButton to='/profile'>Profile</NavBarButton>
                  <button
                    onClick={handleLogOut}
                    className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium  hover:bg-gray-700'
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <NavBarButton to='/login'>Login</NavBarButton>
                  <NavBarButton to='/register'>Register</NavBarButton>
                </>
              )}
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};
