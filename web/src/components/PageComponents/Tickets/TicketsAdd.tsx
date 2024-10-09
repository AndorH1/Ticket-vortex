import React, { useState, useEffect } from 'react';
import { Form } from '../../../atoms';
import { addTicket } from '../../../api/ticketApi';
import { getAllEvents } from '../../../api/eventApi';
import { Input, Label, Button } from '../../../atoms';
import { TicketType } from './ticketType';
import { Ticket } from '../../../type/ticketInterface';
import { Event } from '../../../type/eventInterface';
import { toast } from 'react-toastify';

export const TicketAdd: React.FC = () => {
  const [formState, setFormState] = useState<Ticket>({
    eventId: '',
    price: 0,
    quantity: 0,
    category: TicketType.General,
  });
  const [, setError] = useState<string>('');
  const [, setSuccess] = useState<string>('');

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents();
        setEvents(data);
        setSuccess('');
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events.');
      }
    }

    fetchEvents();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'price' || name === 'quantity' ? parseFloat(value) : value;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: updatedValue,
    }));
  };

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setFormState((prevFormState) => ({
      ...prevFormState,
      eventId: selectedId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { eventId, price, category, quantity } = formState;
    try {
      if (!eventId || isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
        throw new Error('Please provide valid event, price, and quantity.');
      }

      const ticketData: Ticket = {
        eventId,
        price: Number(price),
        category,
        quantity: Number(quantity),
      };

      await addTicket(ticketData);
      toast.success('Ticket added successfully');
    } catch (error) {
      toast.error('Error adding ticket: Failed to add ticket. Please try again.');
    }
  };

  return (
    <div className='max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='eventId' className='dark:text-gray-200'>
            Event
          </label>
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            name='eventId'
            id='eventId'
            value={formState.eventId}
            onChange={handleEventChange}
            required
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
          <Label htmlFor='price' className='dark:text-gray-200 pt-4'>
            Price
          </Label>
          <Input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            type='number'
            name='price'
            id='price'
            placeholder='300'
            required
            onChange={handleInputChange}
            value={formState.price}
          />
        </div>
        <div>
          <Label htmlFor='quantity' className='dark:text-gray-200 pt-4'>
            Quantity
          </Label>
          <Input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            type='number'
            name='quantity'
            id='quantity'
            placeholder='300'
            required
            onChange={handleInputChange}
            value={formState.quantity}
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
            value={formState.category}
            onChange={handleInputChange}
          >
            {Object.values(TicketType).map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <Button type='submit'>Add</Button>
      </Form>
    </div>
  );
};
