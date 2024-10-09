import React, { useEffect, useState } from 'react';
import { TicketReservationsCard } from '../../../atoms/TicketReservationCard/TicketReservationsCard';
import { EventCard } from '../../../atoms/EventCard/EventCard'; // Import the EventCard component
import { getAllTicketsReservations, getAllEvents } from '../../../api/eventApi'; // Import both API functions
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Event } from '../../../type/eventInterface';

export const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const userVerified = user?.verified;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let data;
        if (userVerified) {
          data = await getAllTicketsReservations();
        } else {
          data = await getAllEvents();
        }
        setEvents(data);
      } catch (error) {
        setError('Failed to fetch events.');
        console.error(error);
      }
    };

    fetchEvents();
  }, [userVerified]);

  const handleOnClick = (eventId: string) => {
    if (userVerified) {
      console.log('Event ID:', eventId);
      navigate(`/event/${eventId}/tickets&reservations`);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {events.map((event) =>
          userVerified ? (
            <TicketReservationsCard
              key={event._id}
              event={event}
              onClick={() => handleOnClick(event._id)}
              clickable={true}
            />
          ) : (
            <EventCard key={event._id} event={event} clickable={false} />
          )
        )}
      </div>
    </div>
  );
};
