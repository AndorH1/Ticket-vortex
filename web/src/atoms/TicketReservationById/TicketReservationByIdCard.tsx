import React from 'react';
import { Event } from '../../type/eventInterface';

interface EventCardProps {
  event: Event;
}

export const TicketReservationByIdCard: React.FC<EventCardProps> = ({ event }) => {
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
    reservations,
  } = event;

  return (
    <div className='hover:bg-gray-600 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <img className='rounded-t-lg w-full h-48 object-cover' src={photo} alt={name} />
      <div className='p-5'>
        <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>{name}</h5>
        <p className='text-gray-500 dark:text-gray-400'>Location: {location.address}</p>
        <p className='text-gray-500 dark:text-gray-400'>
          Start Date: {new Date(startDate).toLocaleDateString()}
        </p>
        <p className='text-gray-500 dark:text-gray-400'>
          End Date: {new Date(endDate).toLocaleDateString()}
        </p>
        <p className='text-gray-500 dark:text-gray-400'>Type: {type}</p>
        <p className='text-gray-500 dark:text-gray-400'>Available Capacity: {availableCapacity}</p>
        <p className='text-gray-500 dark:text-gray-400'>Max Capacity: {maxCapacity}</p>
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

        {reservations.length > 0 && (
          <div className='mt-5'>
            <h6 className='text-lg font-semibold text-gray-900 dark:text-white'>Reservations:</h6>
            <ul className='mt-2'>
              {reservations.map((reservation) => (
                <li key={reservation.reservationId} className='text-gray-700 dark:text-gray-300'>
                  <p>User ID: {reservation.userId}</p>
                  <ul className='ml-4 mt-1'>
                    {reservation.tickets.map((ticket) => (
                      <li key={ticket._id} className='text-gray-500 dark:text-gray-400'>
                        Ticket ID: {ticket.ticketId}, Amount: {ticket.amount}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
