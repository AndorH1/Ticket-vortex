import { Button, Table, Th } from '../../../atoms';
import React, { useEffect, useState } from 'react';
import { deleteReservationByAdmin, getAllReservations } from '../../../api/reservationApi';
import { getAllUsers } from '../../../api/userApi';
import { getAllEvents } from '../../../api/eventApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { Tickets } from '../../../type/ticketInterface';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
}
interface Event {
  eventId: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  type: string;
}

interface Reservation {
  _id: string;
  eventId: string;
  userId: string;
  tickets: Tickets[];
  amount: number;
}

export const ReservationAll: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();
  const userRole = user?.role;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getAllReservations();
        setReservations(data);
      } catch (error) {
        setError('Failed to fetch reservations.');
      }
    };
    fetchReservations();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (error) {
        setError('Failed to fetch events.');
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        setError('Failed to fetch users.');
      }
    };
    fetchUsers();
  }, []);
  const navigate = useNavigate();

  const handleEditClick = (id: string) => {
    navigate(`/reservation/edit/${id}`);
  };

  const handleDeleteClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowConfirm(true);
  };
  const getEventName = (eventId: string): string => {
    const event = events.find((e) => e.eventId === eventId);
    if (!event) {
      return 'Unknown Event';
    }
    return event.name;
  };

  const getUserName = (id: string): string => {
    const user = users.find((e) => e.id === id);
    if (!user) {
      return 'Unknown User';
    }
    return user.username;
  };
  const confirmDelete = async () => {
    if (selectedReservation) {
      try {
        await deleteReservationByAdmin(selectedReservation._id);
        setSuccess('Reservation deleted successfully');
        setReservations((prevTickets) =>
          prevTickets.filter((e) => e._id !== selectedReservation._id)
        );

        toast.success('Reservation deleted successfully');
      } catch (error) {
        console.error('Error deleting ticket:', error);
        toast.error('Failed to delete reservation. Please try again.');
      }
    }
    setShowConfirm(false);
    setSelectedReservation(null);
  };
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <Table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Event Name
            </th>
            <th scope='col' className='px-6 py-3'>
              User Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Reservations
            </th>

            {userRole === 'admin' && (
              <>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr
              key={reservation._id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <td className='px-6 py-4'>{getEventName(reservation.eventId)}</td>
              <td className='px-6 py-4'>{getUserName(reservation.userId)}</td>
              <td className='px-6 py-4'>
                {reservation.tickets?.length > 0 ? (
                  <React.Fragment>
                    {reservation.tickets.map((ticket) => (
                      <React.Fragment>
                        <p>Ticket ID: {ticket.ticketId}</p>
                        <p>Amount: {ticket.amount}</p>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ) : (
                  <div>No tickets available</div>
                )}
              </td>
              {userRole === 'admin' && (
                <>
                  <td className='px-2 py-4 text-center'>
                    <Button onClick={() => handleEditClick(reservation._id)}>Edit</Button>
                  </td>
                  <td className='px-2 py-4 text-center'>
                    <Button onClick={() => handleDeleteClick(reservation)}>Delete</Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {showConfirm && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <p>Are you sure you want to delete this reservation?</p>
            <div className='mt-4'>
              <Button onClick={confirmDelete} className='ml-2'>
                Yes
              </Button>
              <Button onClick={() => setShowConfirm(false)} className='ml-2'>
                No
              </Button>
            </div>
          </div>
        </div>
      )}
      {error && <p className='text-red-500'>{error}</p>}
      {success && <p className='text-green-500'>{success}</p>}
    </div>
  );
};
