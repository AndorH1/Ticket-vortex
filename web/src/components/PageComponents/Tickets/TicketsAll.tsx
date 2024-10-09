import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTicket, getAllTickets } from '../../../api/ticketApi';
import { getAllEvents } from '../../../api/eventApi';
import { Button } from '../../../atoms';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

interface Ticket {
  _id: string;
  eventId: string;
  price: number;
  category: string;
  quantity: number;
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

export const TicketsAll: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [, setSuccess] = useState<string>('');
  const [, setError] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user?.role;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getAllTickets();
        setTickets(data);
      } catch (error) {
        setError('Failed to fetch tickets.');
      }
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
        setSuccess('Events fetched successfully');
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events.');
      }
    };
    fetchEvents();
  }, []);

  const handleEditClick = (id: string) => {
    navigate(`/ticket/edit/${id}`);
  };

  const handleDeleteClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedTicket) {
      try {
        await deleteTicket(selectedTicket._id);

        setTickets((prevTickets) => prevTickets.filter((e) => e._id !== selectedTicket._id));

        toast.success('Ticket deleted successfully');
      } catch (error) {
        toast.error('Failed to delete ticket. Please try again.');
      }
    }
    setShowConfirm(false);
    setSelectedTicket(null);
  };

  const getEventName = (eventId: string): string => {
    const event = events.find((e) => e.eventId === eventId);
    if (!event) {
      console.warn(`Event ID ${eventId} not found in events list.`);
    }
    return event ? event.name : 'Unknown Event';
  };

  if (tickets.length === 0 || events.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      {showConfirm && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <p>Are you sure you want to delete this ticket?</p>
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
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Event ID
            </th>
            <th scope='col' className='px-6 py-3'>
              Event Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Price
            </th>
            <th scope='col' className='px-6 py-3'>
              Quantity
            </th>
            <th scope='col' className='px-6 py-3'>
              Category
            </th>
            {userRole === 'admin' && (
              <>
                <th scope='col' className='px-6 py-3'></th>
                <th scope='col' className='px-6 py-3'></th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket._id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <td className='px-6 py-4'>{ticket.eventId}</td>
              <td className='px-6 py-4'>{getEventName(ticket.eventId)}</td>
              <td className='px-6 py-4'>{ticket.price}</td>
              <td className='px-6 py-4'>{ticket.quantity}</td>
              <td className='px-6 py-4'>{ticket.category}</td>
              {userRole === 'admin' && (
                <>
                  <td className='px-6 py-4 text-center'>
                    <Button onClick={() => handleEditClick(ticket._id)}>Edit</Button>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <Button onClick={() => handleDeleteClick(ticket)}>Delete</Button>
                  </td>
                </>
              )}
              {userRole === 'user'}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
