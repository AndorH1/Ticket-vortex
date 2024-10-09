import React, { useEffect, useState } from 'react';
import { deleteEvent, getAllEvents } from '../../../api/eventApi';
import { Button, Input, Table, Th } from '../../../atoms';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Event, EventType } from '../../../type/eventInterface';
import { Label } from '../../../atoms/Label';
import { toast } from 'react-toastify';

export const AllEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [filterLocation, setFilterLocation] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterStartDate, setFilterStartDate] = useState<string>('');
  const [filterEndDate, setFilterEndDate] = useState<string>('');

  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user?.role;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();

        let filteredEvents = data;

        if (filterLocation) {
          filteredEvents = filteredEvents.filter((event: { location: { address: string } }) =>
            event.location.address.toLowerCase().includes(filterLocation.toLowerCase())
          );
        }

        if (filterType) {
          filteredEvents = filteredEvents.filter((event: { type: string }) =>
            event.type.toLowerCase().includes(filterType.toLowerCase())
          );
        }

        if (filterStartDate) {
          filteredEvents = filteredEvents.filter(
            (event: { startDate: string | number | Date }) =>
              new Date(event.startDate) >= new Date(filterStartDate)
          );
        }

        if (filterEndDate) {
          filteredEvents = filteredEvents.filter(
            (event: { endDate: string | number | Date }) =>
              new Date(event.endDate) <= new Date(filterEndDate)
          );
        }

        setEvents(filteredEvents);
      } catch (error) {
        toast.error('Failed to fetch events. Please try again.');
        setError('Failed to fetch events. Please try again.');
      }
    };
    fetchEvents();
  }, [filterLocation, filterType, filterStartDate, filterEndDate]);

  const handleEditClick = (eventId: string) => {
    navigate(`/event/edit/${eventId}`);
  };

  const handleDeleteClick = async (event: Event) => {
    try {
      if (event && event.eventId) {
        await deleteEvent(event.eventId);
        setEvents((prevEvents) => prevEvents.filter((e) => e.eventId !== event.eventId));
        toast.success('Event deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete event. Please try again.');
      setSuccess('');
    }
  };

  return (
    <>
      <div>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        {success && (
          <div className='text-center'>
            <p className='text-green-500 text-sm'>{success}</p>
          </div>
        )}
      </div>

      <div className='flex items-center bg-slate-800 sm:rounded-lg mb-3'>
        <div className='mx-8'>
          <Label htmlFor='filterLocation' className='mr-2  text-gray-500'>
            Location:
          </Label>
          <Input
            id='filterLocation'
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className='border rounded p-2 '
            placeholder='Filter by location'
          />
        </div>
        <div className='mx-8'>
          <Label htmlFor='filterType' className='mr-2  text-gray-500'>
            Type:
          </Label>
          <select
            id='filterType'
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as EventType)}
            className='border rounded p-2 bg-gray-600  dark:text-white dark:border-gray-600 '
          >
            <option value='' className='bg-gray-500 '>
              Select type
            </option>
            {Object.values(EventType).map((type) => (
              <option key={type} value={type} className='bg-gray-500'>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className='mx-8'>
          <Label htmlFor='filterStartDate' className='mr-2  text-gray-500'>
            Start Date:
          </Label>
          <Input
            id='filterStartDate'
            type='date'
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            className='border rounded p-2'
          />
        </div>
        <div className='mx-8 my-4'>
          <Label htmlFor='filterEndDate' className='mr-2  text-gray-500'>
            End Date:
          </Label>
          <Input
            id='filterEndDate'
            type='date'
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            className='border rounded p-2'
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <Th>Title</Th>
            <Th>Location</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Type</Th>
            <Th>Photo</Th>
            {userRole === 'admin' && (
              <>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </>
            )}
          </tr>
        </thead>
        <tbody className='text-center'>
          {events.map((event) => (
            <tr
              key={event.eventId}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <td className='px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-white'>
                {event.name}
              </td>
              <td className='px-4 py-4 text-gray-500'>{event.location.address}</td>
              <td className='px-5 py-4 text-gray-500'>{event.startDate}</td>
              <td className='px-5 py-4 text-gray-500'>{event.endDate}</td>
              <td className='px-2 py-4 text-gray-500'>{event.type}</td>
              <td className='px-4 py-4'>
                {event.photo ? (
                  <img
                    src={event.photo}
                    alt={event.name}
                    className='w-32 h-32 object-cover rounded'
                  />
                ) : (
                  <p>No photo available</p>
                )}
              </td>
              {userRole === 'admin' && (
                <>
                  <td className='px-2 py-4 text-center'>
                    <Button onClick={() => handleEditClick(event.eventId)}>Edit</Button>
                  </td>
                  <td className='px-2 py-4 text-center'>
                    <Button onClick={() => handleDeleteClick(event)}>Delete</Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
