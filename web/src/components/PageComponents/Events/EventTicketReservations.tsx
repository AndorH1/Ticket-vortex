import React, { useEffect, useState } from 'react';
import { TicketReservationByIdCard } from '../../../atoms/TicketReservationById/TicketReservationByIdCard';
import { getAllTicketsReservationsById } from '../../../api/eventApi';
import { useParams } from 'react-router-dom';
import { Event } from '../../../type/eventInterface';

export const EventTicketReservations: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [, setError] = useState<string>('');
  const { eventId } = useParams<{ eventId: string }>();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getAllTicketsReservationsById(eventId as string);
        setEvent(data);
        console.log(data);
      } catch (error) {
        setError('Failed to fetch event data.');
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) return;

  return (
    <div className='flex items-center justify-center '>
      <TicketReservationByIdCard event={event} />
    </div>
  );
};
