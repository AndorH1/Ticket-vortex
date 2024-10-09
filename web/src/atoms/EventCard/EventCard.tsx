import React from 'react';

interface EventCardProps {
  event: {
    eventId: string;
    name: string;
    location: {
      address: string;
    };
    startDate: string;
    endDate: string;
    photo: string;
    type: string;
    organizer: {
      firstName: string;
      lastName: string;
      photo: string;
    };
  };
  onClick?: () => void;
  clickable: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick, clickable }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden ${clickable ? 'cursor-pointer' : ''}`}
      onClick={clickable ? onClick : undefined}
    >
      <div key={event.eventId} className='bg-white shadow-md rounded-lg overflow-hidden'>
        <img src={event.photo} alt={event.name} className='w-full h-48 object-cover' />
        <div className='p-4'>
          <h2 className='text-xl font-semibold'>{event.name}</h2>
          <p className='text-gray-600'>
            {new Date(event.startDate).toLocaleDateString()} -{' '}
            {new Date(event.endDate).toLocaleDateString()}
          </p>
          <p className='text-gray-800'>{event.location.address}</p>
          <p className='text-gray-500'>{event.type}</p>
          <div className='flex items-center mt-4'>
            <img
              src={event.organizer.photo}
              alt={`${event.organizer.firstName} ${event.organizer.lastName}`}
              className='w-10 h-10 rounded-full'
            />
            <div className='ml-2'>
              <p className='text-gray-800 font-medium'>
                {event.organizer.firstName} {event.organizer.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
