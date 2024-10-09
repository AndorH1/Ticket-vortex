import React, { useState } from 'react';
import { Form } from '../../../atoms/Form';
import { addEvent } from '../../../api/eventApi';
import { Input, Label, Button } from '../../../atoms';
import { EventType } from './eventTypes';
import { toast } from 'react-toastify';
import { Event } from '../../../type/eventInterface';
import { useNavigate } from 'react-router-dom';

export const AddEvent: React.FC = () => {
  const [formState, setFormState] = useState<Event>({
    eventId: '',
    _id: '',
    name: '',
    location: {
      address: '',
      latitude: '',
      longitude: '',
    },
    startDate: '',
    endDate: '',
    description: '',
    maxCapacity: 0,
    availableCapacity: 0,
    type: EventType.Concert,
    photo: '',
    tickets: [],

    reservations: [],
    organizer: {
      id: '',
      firstName: '',
      lastName: '',
      photo: '',
    },
  });
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'latitude') {
      setFormState((prevFormState) => ({
        ...prevFormState,
        location: {
          ...prevFormState.location,
          latitude: value,
        },
      }));
    } else if (name === 'longitude') {
      setFormState((prevFormState) => ({
        ...prevFormState,
        location: {
          ...prevFormState.location,
          longitude: value,
        },
      }));
    } else if (name === 'address') {
      setFormState((prevFormState) => ({
        ...prevFormState,
        location: {
          ...prevFormState.location,
          address: value,
        },
      }));
    } else {
      setFormState((prevFormState) => ({
        ...prevFormState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentDate = new Date();
    const startDate = new Date(formState.startDate);
    const endDate = new Date(formState.endDate);

    if (startDate < currentDate) {
      toast.error('Start date cannot be in the past');
      return;
    }

    if (endDate < startDate) {
      toast.error('End date cannot be before start date');
      return;
    }
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      console.log(formState);
      await addEvent(formState, file);
      console.log(formState);
      toast.success('Event added successfully!');
      setSuccess('Event added successfully!');
      navigate('/events/all');
      setError('');
    } catch (error) {
      toast.error('Failed to add event. Please try again.');
      setError('Failed to add event. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className='max-w-4xl mx-auto mt-10 p-5 border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
      <Form onSubmit={handleSubmit}>
        <div className='flex flex-row'>
          <div className='w-1/2 p-2'>
            <Label htmlFor='name' className='dark:text-gray-200'>
              Name:
            </Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='Untold'
              required
              onChange={handleInputChange}
            />
          </div>
          <div className='w-1/2 p-2'>
            <Label htmlFor='address' className='dark:text-gray-200'>
              Address:
            </Label>
            <Input
              type='text'
              name='address'
              id='address'
              placeholder='Cluj Arena'
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className='flex flex-row'>
          <div className='w-1/3 p-2'>
            <Label htmlFor='startDate' className='dark:text-gray-200'>
              Start Date:
            </Label>
            <Input
              type='datetime-local'
              name='startDate'
              id='startDate'
              required
              onChange={handleInputChange}
            />
          </div>
          <div className='w-1/3 p-2'>
            <Label htmlFor='endDate' className='dark:text-gray-200'>
              End Date:
            </Label>
            <Input
              type='datetime-local'
              name='endDate'
              id='endDate'
              required
              onChange={handleInputChange}
            />
          </div>
          <div className='w-1/3 p-2'>
            <Label htmlFor='latitude' className='dark:text-gray-200'>
              Latitude:
            </Label>
            <Input
              type='text'
              name='latitude'
              id='latitude'
              placeholder='46.770439'
              required
              onChange={handleInputChange}
            />
          </div>
          <div className='w-1/3 p-2'>
            <Label htmlFor='longitude' className='dark:text-gray-200'>
              Longitude:
            </Label>
            <Input
              type='text'
              name='longitude'
              id='longitude'
              placeholder='23.589920'
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className='flex flex-row'>
          <div className='w-1/2 p-2'>
            <Label htmlFor='description' className='dark:text-gray-200'>
              Description:
            </Label>
            <Input
              type='text'
              name='description'
              id='description'
              placeholder='Festival'
              required
              onChange={handleInputChange}
            />
          </div>

          <div className='w-1/2 p-2'>
            <Label htmlFor='maxCapacity' className='dark:text-gray-200'>
              Capacity:
            </Label>
            <Input
              type='number'
              name='maxCapacity'
              id='maxCapacity'
              placeholder='300000'
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className='flex flex-row'>
          <div className='w-1/2 p-2'>
            <Label htmlFor='type' className='dark:text-gray-200'>
              Type:
            </Label>
            <select
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm transition ease-in-out duration-150'
              name='type'
              id='type'
              onChange={handleInputChange}
            >
              {Object.values(EventType).map((type) => (
                <option
                  key={type}
                  value={type}
                  className='text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2.5'
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className='w-1/2 p-2'>
            <Label htmlFor='photo' className='dark:text-gray-200'>
              Photo:
            </Label>
            <Input type='file' name='photo' id='photo' onChange={handleFileChange} />
          </div>
        </div>

        <Button type='submit' className='mt-6'>
          Add
        </Button>

        {error && <p className='text-red-500 text-sm'>{error}</p>}
        {success && (
          <div className='text-center'>
            <p className='text-green-500 text-sm'>{success}</p>
          </div>
        )}
      </Form>
    </div>
  );
};
