import React from 'react';
import { Event } from '../../type/eventInterface';

interface CardProps {
  event: Event;
  onClick?: () => void;
  clickable?: boolean;
}

export const TicketReservationsCard: React.FC<CardProps> = ({ event, onClick, clickable }) => {
  const {
    name,
    location,
    startDate,
    endDate,
    description,
    type,
    photo,
    availableCapacity,
    maxCapacity,
    organizer,
  } = event;

  return (
    <div
      className={`max-w-sm bg-white border hover:bg-gray-700 border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 ${clickable ? 'cursor-pointer' : ''}`}
      onClick={clickable ? onClick : undefined}
    >
      <img className='rounded-t-lg w-full h-48 object-cover' src={photo} alt={name} />
      <div className='p-5'>
        <h5 className='text-x  tracking-tight text-gray-200 dark:text-gray-400'>
          Event Name: <span className=' text-gray-200 font-bold text-xl'> {name}</span>
        </h5>
        <p className='text-gray-500 dark:text-gray-400'>
          Location: <span className='font-bold'> {location.address}</span>
        </p>
        <p className='text-gray-500 dark:text-gray-400'>
          Start Date: <span className=' text-lg'>{new Date(startDate).toLocaleDateString()}</span>
        </p>
        <p className='text-gray-500 dark:text-gray-400'>
          End Date: <span className=' text-lg'> {new Date(endDate).toLocaleDateString()}</span>
        </p>
        <p className='text-gray-500 '>Type: {type}</p>
        <p className=' dark:text-gray-400'>Available Capacity: {availableCapacity}</p>
        <p className=' dark:text-gray-400'>Max Capacity: {maxCapacity}</p>
        <p className='mt-3 text-gray-700 dark:text-gray-300'>{description}</p>

        <div className='mt-5'>
          <h6 className='text-lg font-semibold text-gray-900 dark:text-white'>Organizer:</h6>
          <div className='flex items-center mt-2'>
            <img
              className='w-10 h-10 rounded-full object-cover'
              src={organizer.photo}
              alt={`${organizer.firstName} ${organizer.lastName}`}
            />
            <p className='ml-3 text-gray-700 dark:text-gray-300'>
              {organizer.firstName} {organizer.lastName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TicketReservationsList: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <div className='flex flex-wrap gap-4'>
      {events.map((event) => (
        <TicketReservationsCard key={event.eventId} event={event} />
      ))}
    </div>
  );
};
