import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Label } from '../../../atoms';
import { getReservationById, updateReservationById } from '../../../api/reservationApi';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllTickets } from '../../../api/ticketApi';
import { toast } from 'react-toastify';

interface Tickets {
  _id: string;
  ticketId: string;
  amount: number;
}

interface Reservation {
  _id: string;
  eventId: string;
  userId: string;
  tickets: Tickets[];
  amount: number;
  reservationId: string;
}

export const EditReservations: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [reservationFormState, setReservationFormState] = useState<Reservation>({
    _id: '',
    reservationId: '',
    amount: 0,
    eventId: '',
    userId: '',
    tickets: [{ _id: '', ticketId: '', amount: 0 }],
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [, setTickets] = useState<Tickets[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [originalReservation, setOriginalReservation] = useState<Reservation>(reservationFormState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedReservation = await getReservationById(id as string);
        setReservationFormState(fetchedReservation);
        setOriginalReservation(fetchedReservation);

        const fetchedTickets = await getAllTickets();
        console.log(fetchedTickets);
        setTickets(fetchedTickets);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
      }
    };
    fetchData();
  }, [id]);

  const handleTicketChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number
  ) => {
    if (!isEditing) return;

    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);

    setReservationFormState((prev) => {
      const updatedTickets = prev.tickets.map((ticket, i) => {
        if (i === index) {
          if (name === 'ticketId') {
            return { ...ticket, ticketId: value };
          } else if (name === 'amount') {
            return { ...ticket, amount: parseInt(value, 10) };
          }
        }
        return ticket;
      });

      console.log('Updated tickets:', updatedTickets);

      return {
        ...prev,
        tickets: updatedTickets,
      };
    });
  };

  const handleEdit = () => {
    setOriginalReservation(reservationFormState);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setReservationFormState(originalReservation);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleOnSave();
  };

  const handleOnSave = async () => {
    setError('');
    setSuccess('');
    try {
      if (id) {
        const updatedReservation = await updateReservationById(id, reservationFormState);
        setSuccess('Reservation updated successfully.');
        toast.success('Reservation updated successfully.');
        console.log('Reservation updated:', updatedReservation);
        setReservationFormState(updatedReservation);
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('Failed to update reservation.');
      setError('Failed to update reservation.');
    }
  };

  const handleNavigateToAllReservations = () => {
    navigate(`/reservations/all`);
  };

  const generateTicketElements = () => {
    return reservationFormState.tickets.map((ticket, i) => (
      <div key={i}>
        <Label htmlFor='ticketId' className='dark:text-gray-200 pt-4'>
          Ticket ID
        </Label>
        <Input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          name='ticketId'
          id='ticketId'
          value={ticket.ticketId}
          required
          disabled
        />

        <Label htmlFor={`amount`} className='dark:text-gray-200 pt-4'>
          Amount
        </Label>
        <Input
          type='number'
          name='amount'
          id={`amount-${i}`}
          value={ticket.amount.toString()}
          onChange={(e) => handleTicketChange(e, i)}
          required
        />
      </div>
    ));
  };

  if (!reservationFormState) return <div>Loading...</div>;

  return (
    <>
      <div className='max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
        <h1 className='text-2xl font-bold mb-5 dark:text-white'>
          Edit Reservation: {reservationFormState.eventId}
        </h1>

        <Form onSubmit={handleSubmit}>{generateTicketElements()}</Form>

        <div className='pt-3'>
          {!isEditing ? (
            <div className='flex justify-end mb-5'>
              <Button type='button' onClick={handleEdit}>
                Edit
              </Button>
            </div>
          ) : (
            <div className='flex justify-end mb-5 space-x-4'>
              <Button type='submit' onClick={handleOnSave}>
                Save
              </Button>
              <Button type='button' onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          {success && (
            <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
              <div className='bg-white p-6 rounded shadow-lg'>
                <p className='text-green-500 text-sm'>{success}</p>
                <Button onClick={handleNavigateToAllReservations}>Go to all reservations</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
