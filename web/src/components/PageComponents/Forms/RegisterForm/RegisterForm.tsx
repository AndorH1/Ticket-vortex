import React, { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { Button, CompanyIcon, Form, Input, Label } from '../../../../atoms';
import { registerUser } from '../../../../api/userApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface State {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmationPassword: string;
  photo: string;
  address: string;
  role: string;
  country: string;
  city: string;
}

export const Register: React.FC = () => {
  const [formState, setFormState] = useState<State>({
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmationPassword: '',
    photo: '',
    address: '',
    role: '',
    country: '',
    city: '',
  });
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, confirmationPassword, firstName, lastName, username, email, phoneNumber } =
      formState;

    if (!firstName) {
      setError('Please enter your first name');
      return;
    }
    if (!lastName) {
      setError('Please enter your last name');
      return;
    }
    if (!username) {
      setError('Please enter your user name');
      return;
    }
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmationPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    try {
      await registerUser({
        password,
        firstName,
        lastName,
        username,
        phoneNumber,
        email,
        photo: '',
        address: '',
        role: '',
        country: '',
        city: '',
      });
      toast.success('Registration successful! Now you can log in.');
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center py-2'>
      <CompanyIcon className='w-8 h-8' />
      <a
        href='#'
        className='flex items-center mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-900'
      >
        Vortex Ticket
      </a>
      <div className='w-max bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h2 className='text-xl  text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Create an account
          </h2>
          <Form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
            <div className='flex flex-row text-center'>
              <div className='w-1/2 p-2'>
                <Label htmlFor='firstName' className='dark:text-gray-200'>
                  Your first name
                </Label>
                <Input
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center'
                  type='text'
                  name='firstName'
                  id='firstName'
                  placeholder='John'
                  onChange={handleInputChange}
                />
              </div>
              <div className='w-1/2 p-2'>
                <Label htmlFor='lastName' className='dark:text-gray-200'>
                  Your last name
                </Label>
                <Input
                  type='text'
                  name='lastName'
                  id='lastName'
                  placeholder='Doe'
                  onChange={handleInputChange}
                  className='text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
              </div>
            </div>
            <div className='flex flex-row text-center'>
              <div className='w-full p-2'>
                <Label htmlFor='username' className='dark:text-gray-200'>
                  Username
                </Label>
                <Input
                  type='text'
                  name='username'
                  id='username'
                  placeholder='john_doe'
                  onChange={handleInputChange}
                  className='text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
              </div>

              <div className='w-full p-2'>
                <Label htmlFor='email' className='dark:text-gray-200'>
                  Your email
                </Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='name@company.com'
                  onChange={handleInputChange}
                  className=' text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
              </div>
            </div>
            <div className='flex flex-row text-center'>
              <div className='w-full p-2'>
                <Label htmlFor='password' className='dark:text-gray-200'>
                  Password
                </Label>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-3 pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    value={formState.password}
                    onChange={handleInputChange}
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
              <div className='w-full p-2'>
                <Label htmlFor='confirmPassword' className='dark:text-gray-200'>
                  Confirm password
                </Label>
                <div className='relative'>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmationPassword'
                    id='confirmPassword'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-3 pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    value={formState.confirmationPassword}
                    onChange={handleInputChange}
                  />
                  <span
                    id='showConfirmPassword'
                    className='cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3'
                    onClick={handleToggleConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <BsFillEyeFill className='text-gray-700 dark:text-gray-400' />
                    ) : (
                      <BsFillEyeSlashFill className='text-gray-700 dark:text-gray-400' />
                    )}
                  </span>
                </div>
              </div>
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            {success && (
              <div className='text-center'>
                <p className='text-green-500 text-sm'>{success}</p>
                <Link to='/login' className='text-blue-500'>
                  Login
                </Link>
              </div>
            )}

            <Button type='submit'>Register</Button>
            <p className='text-sm text-center font-light text-gray-500 dark:text-gray-400'>
              Already have an account? <br />
              <Link
                to='/login'
                className='font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Login here
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};
