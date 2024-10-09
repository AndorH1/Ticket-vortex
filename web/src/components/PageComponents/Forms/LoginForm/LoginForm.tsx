import React, { useState } from 'react';
import { Button, CompanyIcon, Input, Label } from '../../../../atoms';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login({ username, password });
      setError(null);
      toast.success('Login successful!');
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center py-6'>
      <CompanyIcon className='w-8 h-8' />
      <a
        href='#'
        className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-900'
      >
        Vortex ticket
      </a>
      <div className='w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Login to your account
          </h1>
          <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
            <div>
              <Label className='dark:text-gray-200' htmlFor='username'>
                Your username
              </Label>
              <Input
                type='text'
                name='username'
                id='username'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='your-username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label className='dark:text-gray-300' htmlFor='password'>
                Password
              </Label>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-3 pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  id='showPassword'
                  className='cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3'
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <BsFillEyeFill className='text-gray-700 dark:text-gray-400' />
                  ) : (
                    <BsFillEyeSlashFill className='text-gray-700 dark:text-gray-400' />
                  )}
                </span>
              </div>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <Button type='submit'>Log in</Button>

            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Don’t have an account yet?
              <a
                href='register'
                className='font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Sign up here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
