import React, { useEffect, useState } from 'react';
import { User, UserType } from '../../../type/userInterface';
import { useParams } from 'react-router-dom';
import { getUserByIdAdmin, updateUserRole } from '../../../api/adminApi';
import { Button, Form, Input, Label } from '../../../atoms';
import { toast } from 'react-toastify';

export const EditUser: React.FC = () => {
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
    if (!userFormState.username || !userFormState.role) {
      console.error('Username or role is missing.');
      return;
    }

    try {
      console.log('before', selectUserName, userFormState.role);

      await updateUserRole(selectUserName, userFormState.role);
      toast.success('User updated successfully!');

      console.log('User role updated successfully', userFormState.username, userFormState.role);

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
              Name:
            </Label>
            <Input
              type='text'
              id='username'
              name='username'
              value={userFormState.username}
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
        {isEditing && (
          <div className='flex justify-end space-x-4 mt-6'>
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
