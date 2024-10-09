import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById, updateEvent } from '../../../api/eventApi';
import { Button, Input, Label } from '../../../atoms';
import { Form } from '../../../atoms/Form';
import { EventType } from './eventTypes';
import { toast } from 'react-toastify';
import { Event } from '../../../type/eventInterface';

export const EditEvents: React.FC = () => {
  const [eventFormState, setEventFormState] = useState<Event>({
    eventId: '',
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
    type: EventType,
    photo: '',
  });
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [originalEvent, setOriginalEvent] = useState<Event>(eventFormState);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id as string);
        // Format dates to `YYYY-MM-DDTHH:MM` format
        data.startDate = new Date(data.startDate).toISOString().slice(0, 16);
        data.endDate = new Date(data.endDate).toISOString().slice(0, 16);
        setEvent(data);
        setEventFormState(data);
        setOriginalEvent(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!isEditing) return;

    const { name, value } = e.target;

    if (name === 'address' || name === 'latitude' || name === 'longitude') {
      setEventFormState((prevState) => ({
        ...prevState,
        location: {
          ...prevState.location,
          [name]: value,
        },
      }));
    } else if (name === 'maxCapacity') {
      setEventFormState((prevState) => ({
        ...prevState,
        [name]: parseInt(value, 10),
      }));
    } else if (name === 'startDate' || name === 'endDate') {
      setEventFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setEventFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleEdit = () => {
    setOriginalEvent(eventFormState);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEventFormState(originalEvent);
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleOnSave = async () => {
    setSuccess('');

    const startDate = new Date(eventFormState.startDate);
    const endDate = new Date(eventFormState.endDate);
    const now = new Date();

    if (startDate < now) {
      toast.error('Start date cannot be in the past.');
      return;
    }

    if (endDate <= startDate) {
      toast.error('End date must be after the start date.');
      return;
    }
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }
    try {
      if (id) {
        console.log(eventFormState);
        const updatedEvent = await updateEvent(id, eventFormState, file);
        toast.success('Event updated successfully');
        setSuccess('Event updated successfully');
        setEventFormState(updatedEvent);
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('Error updating event');
      console.error('Error updating event:', error);
      setError('Error updating event');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleOnSave();
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className='max-w-4xl mx-auto mt-10 p-5 border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
      <h1 className='text-2xl font-bold mb-5 dark:text-white'>Edit event: {eventFormState.name}</h1>

      <Form onSubmit={handleSubmit}>
        <div className='flex flex-row'>
          <div className='w-1/2 p-2'>
            <Label htmlFor='name' className='dark:text-gray-200'>
              Name:
            </Label>
            <Input
              type='text'
              id='name'
              name='name'
              value={eventFormState.name}
              onChange={handleInputChange}
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
              value={eventFormState.location.address}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
              id='startDate'
              name='startDate'
              value={eventFormState.startDate}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='w-1/3 p-2'>
            <Label htmlFor='endDate' className='dark:text-gray-200'>
              End Date:
            </Label>
            <Input
              type='datetime-local'
              id='endDate'
              name='endDate'
              value={eventFormState.endDate}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='w-1/3 p-2'>
            <Label htmlFor='latitude' className='dark:text-gray-200'>
              Latitude:
            </Label>
            <Input
              type='number'
              id='latitude'
              name='latitude'
              value={eventFormState.location.latitude}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='w-1/3 p-2'>
            <Label htmlFor='longitude' className='dark:text-gray-200'>
              Longitude:
            </Label>
            <Input
              type='number'
              id='longitude'
              name='longitude'
              value={eventFormState.location.longitude}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
              id='description'
              name='description'
              value={eventFormState.description}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>

          <div className='w-1/2 p-2'>
            <Label htmlFor='maxCapacity' className='dark:text-gray-200'>
              Max Capacity:
            </Label>
            <Input
              type='number'
              id='maxCapacity'
              name='maxCapacity'
              value={eventFormState.maxCapacity}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
        </div>

        <div className='flex flex-row'>
          <div className='w-1/2 p-2'>
            <Label htmlFor='type' className='dark:text-gray-200'>
              Event Type:
            </Label>
            <select
              id='type'
              name='type'
              value={eventFormState.type}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm transition ease-in-out duration-150'
            >
              {Object.values(EventType).map((type) => (
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

          <div className='w-1/2 p-2'>
            <Label htmlFor='photo' className='dark:text-gray-200'>
              Photo URL:
            </Label>
            <Input
              type='file'
              id='photo'
              name='photo'
              onChange={handleFileChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
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

      {error && <p className='text-red-500'>{error}</p>}
      {success && <p className='text-green-500'>{success}</p>}
    </div>
  );
};
