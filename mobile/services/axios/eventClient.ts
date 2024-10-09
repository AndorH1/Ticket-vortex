import { ZodError } from 'zod';
import { EventList } from '../../utils/globalTypes';
import { EventDetails } from '../schemas/EventSchema';
import { get } from './client';

const endpointsNest = {
  getAllEvents: '/event/getAll',
  getSearchTermEvent: (searchTerm: string) => `/event/search/{searchTerm}?searchTerm=${searchTerm}`,
  getOneEventById: (eventId: string) => `/event/${eventId}`,
};

export const getAllEvents = async (): Promise<EventList> => {
  try {
    const { data } = await get<EventList>(endpointsNest.getAllEvents);

    if (!data || !data.length || !data?.[0]?.eventId) {
      return [];
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSearchTermEvent = async (searchTerm: string): Promise<EventList> => {
  try {
    if (!searchTerm) {
      return await getAllEvents();
    }
    const { data } = await get<EventList>(endpointsNest.getSearchTermEvent(searchTerm), 'public');

    if (!data || !data.length || !data?.[0]?.eventId) {
      return [];
    }

    try {
    } catch (error) {
      console.error(error);
      return [];
    }
    return data;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Invalid event format:', error);
    } else {
      console.error('Failed to fetch the event:', error);
    }
    return [] as EventList;
  }
};

export const getEventById = async (eventId: string): Promise<EventDetails | null> => {
  try {
    const { data } = await get<EventDetails>(endpointsNest.getOneEventById(eventId), 'public');

    if (!data || !data?.eventId) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getNextEvent = async (): Promise<EventDetails | null> => {
  try {
    const responseAllEvents = await getAllEvents();
    const nextEventId = responseAllEvents[0].eventId;
    const { data } = await get<EventDetails>(endpointsNest.getOneEventById(nextEventId), 'public');
    if (!data || !data?.eventId) {
      return null;
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
