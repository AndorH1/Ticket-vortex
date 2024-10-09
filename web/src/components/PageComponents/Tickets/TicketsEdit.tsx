import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTicketById, updateTicketById } from '../../../api/ticketApi';
import { getAllEvents } from '../../../api/eventApi';
import { Button, Input, Label } from '../../../atoms';
import { Form } from '../../../atoms/Form';
import { TicketType } from './ticketType';
import { Event } from '../../../type/eventInterface';
import { Ticket } from '../../../type/ticketInterface';
import { toast } from 'react-toastify';

export const TicketsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');

  const [ticketFormState, setTicketFormState] = useState<Ticket>({
    eventId: '',
    price: 0,
    quantity: 0,
    category: TicketType.General,
  });

  const [originalTicket, setOriginalTicket] = useState<Ticket>(ticketFormState);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents(); // Fetch all events
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTicketById(id as string);
        setTicket(data);
        setTicketFormState(data);
        setSelectedEventId(data.eventId);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };
    fetchTicket();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setTicketFormState({
      ...ticketFormState,
      [name]: value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setTicketFormState((prevState) => ({
      ...prevState,
      category: value,
    }));
  };

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newEventId = event.target.value;
    setSelectedEventId(newEventId);
    setTicketFormState((prevState) => ({
      ...prevState,
      eventId: newEventId,
    }));
  };

  const handleEdit = () => {
    setOriginalTicket(ticketFormState);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTicketFormState(originalTicket);
    setIsEditing(false);
  };

  const handleOnSave = async () => {
    setError('');
    setSuccess('');

    try {
      if (id) {
        const updatedTicketData = {
          ...ticketFormState,
          price: Number(ticketFormState.price),
          quantity: Number(ticketFormState.quantity),
        };

        console.log('Ticket Form State:', updatedTicketData);
        const updatedTicket = await updateTicketById(id, updatedTicketData);
        toast.success('Ticket updated successfully');
        setTicketFormState(updatedTicket);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast.error('Error updating ticket');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleOnSave();
  };

  if (!ticket || events.length === 0) return <div>Loading...</div>;

  const selectedEvent = events.find((event) => event.eventId === selectedEventId);
  const selectedEventName = selectedEvent ? selectedEvent.name : 'Unknown Event';

  return (
    <div className='max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
      <h1 className='text-2xl font-bold mb-5 dark:text-white '>Edit event: {selectedEventName}</h1>

      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor='eventId' className='dark:text-gray-200 pt-4'>
            Event
          </Label>
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            name='eventId'
            id='eventId'
            value={selectedEventId}
            onChange={handleEventChange}
            required
            disabled
          >
            <option value='' disabled>
              Select an event
            </option>
            {events.map((event) => (
              <option key={event.eventId} value={event.eventId}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor='price' className='text-white pt-4'>
            Price
          </Label>
          <Input
            type='number'
            id='price'
            name='price'
            value={ticketFormState.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor='quantity' className='text-white pt-4'>
            Quantity
          </Label>
          <Input
            type='number'
            id='quantity'
            name='quantity'
            value={ticketFormState.quantity}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor='category' className='dark:text-gray-200 pt-4'>
            Category
          </Label>
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4'
            name='category'
            id='category'
            value={ticketFormState.category}
            onChange={handleCategoryChange}
            disabled={!isEditing}
          >
            {Object.values(TicketType).map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </Form>

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
        <div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          {success && <p className='text-green-500 text-sm'>{success}</p>}
        </div>
      </div>
    </div>
  );
};
