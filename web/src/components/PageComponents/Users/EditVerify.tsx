import React, { useEffect, useState } from 'react';
import { User, UserType } from '../../../type/userInterface';
import { useParams } from 'react-router-dom';
import { getUserByIdAdmin, updateUsrVerify } from '../../../api/adminApi';
import { Button, Form, Input, Label } from '../../../atoms';
import { toast } from 'react-toastify';

export const EditVerify: React.FC = () => {
  const [userFormState, setUserFormState] = useState<User>({} as User);
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [originalUser, setOriginalUser] = useState<User>(userFormState);
  const [selectUserName, setUserFormStateUserName] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserByIdAdmin(id as string);
        setUserFormState(data);
        setOriginalUser(data);
        setUserFormStateUserName(data.username);
        console.log(selectUserName);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!isEditing) return;
    const { name, value } = event.target;
    setUserFormState((prevState) => ({
      ...prevState,

      [name]: value,
    }));
  };

  const handleEdit = () => {
    setOriginalUser(userFormState);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUserFormState(originalUser);
    setIsEditing(false);
  };

  const handleOnSave = async () => {
    if (
      !userFormState.username ||
      !userFormState.role ||
      !userFormState.city ||
      !userFormState.country ||
      !userFormState.address
    ) {
      console.log(userFormState.city, userFormState.country, userFormState.address);
      console.error('Username or role is missing.');
      return;
    }

    try {
      console.log('before', userFormState.verified);

      await updateUsrVerify(id as string);
      toast.success('User updated successfully!');

      setIsEditing(false);
    } catch (error) {
      toast.success('User cant be verified!');

      console.error(error);
    }
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleOnSave();
  };

  return (
    <div className='max-w-4xl mx-auto mt-10 p-5 border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
      <Form onSubmit={handleOnSubmit}>
        <div className='flex flex-row'>
          <div className='w-1/2 p-2'>
            <Label htmlFor='username' className='dark:text-gray-200'>
              User name:
            </Label>
            <Input
              type='text'
              id='username'
              name='username'
              value={userFormState.firstName}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='w-1/2 p-2'>
            <Label htmlFor='role' className='dark:text-gray-200'>
              Role:
            </Label>
            <select
              id='role'
              name='role'
              value={userFormState.role}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm transition ease-in-out duration-150'
            >
              {Object.values(UserType).map((type) => (
                <option
                  key={type}
                  value={type}
                  className='text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2.5'
                >
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/2 p-2'>
            <Label htmlFor='firstName' className='dark:text-gray-200'>
              First name:
            </Label>
            <Input
              type='text'
              id='firstName'
              name='firstName'
              onChange={handleInputChange}
              value={userFormState.firstName}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='w-1/2 p-2'>
            <Label htmlFor='lastName' className='dark:text-gray-200'>
              Last name:
            </Label>
            <Input
              type='text'
              id='lastName'
              name='lastName'
              onChange={handleInputChange}
              value={userFormState.lastName}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/2 p-2'>
            <Label htmlFor='email' className='dark:text-gray-200'>
              Email:
            </Label>
            <Input
              type='text'
              id='email'
              name='email'
              onChange={handleInputChange}
              value={userFormState.email}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>{' '}
          <div className='w-1/2 p-2'>
            <Label htmlFor='phoneNumber' className='dark:text-gray-200'>
              Phone number:
            </Label>
            <Input
              type='number'
              id='phoneNumber'
              name='phoneNumber'
              onChange={handleInputChange}
              value={userFormState.phoneNumber}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/2 p-2'>
            <Label htmlFor='country' className='dark:text-gray-200'>
              Country:
            </Label>
            <Input
              type='text'
              id='country'
              name='country'
              onChange={handleInputChange}
              value={userFormState.country}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='w-1/2 p-2'>
            <Label htmlFor='city' className='dark:text-gray-200'>
              City:
            </Label>
            <Input
              type='text'
              id='city'
              name='city'
              onChange={handleInputChange}
              value={userFormState.city}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='w-1/2 p-2'>
            <Label htmlFor='address' className='dark:text-gray-200'>
              Address:
            </Label>
            <Input
              type='text'
              id='address'
              name='address'
              onChange={handleInputChange}
              value={userFormState.address}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
        </div>
        {/* <div>
          <Label htmlFor='verified' className='dark:text-gray-200'>
            Verified:
          </Label>
          <Input
            type='text'
            id='verified'
            name='verified'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center'
          />
        </div> */}
        {isEditing && (
          <div className='flex justify-end space-x-4 mt-6 '>
            <Button onClick={handleCancel} className='bg-red-500 text-white'>
              Cancel
            </Button>
            <Button type='submit' className='bg-blue-500 text-white'>
              Save
            </Button>
          </div>
        )}
        {!isEditing && (
          <Button onClick={handleEdit} className='bg-green-500 text-white mt-6'>
            Edit
          </Button>
        )}
      </Form>
    </div>
  );
};
