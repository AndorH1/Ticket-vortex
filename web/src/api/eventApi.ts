import { privateApi, publicApi } from './apiConfig';
import { Event } from '../type/eventInterface';
import { storage } from '../utils/storage';

export const getAllEvents = async () => {
  try {
    const response = await publicApi.get('/event/getAll');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getAllEventsFilter = async (sortField: string, sortOrder: string, limit: number) => {
  try {
    const response = await privateApi.get('/event/getAll', {
      params: {
        sortField,
        sortOrder,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching events', error);
    throw error;
  }
};

export const getAllTicketsReservations = async () => {
  try {
    const response = await privateApi.get(`/event/getAll/ticketsWithReservations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event data', error);
    throw error;
  }
};
export const getAllTicketsReservationsById = async (eventId: string) => {
  try {
    const response = await privateApi.get(`/event/${eventId}/tickets&reservations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event data', error);
    throw error;
  }
};
export const getEventById = async (id: string) => {
  try {
    const response = await privateApi.get(`/event/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event data', error);
    throw error;
  }
};
export const getEventSearch = async (searchTerm: string) => {
  try {
    const response = await privateApi.get(`/event/search/${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event data', error);
    throw error;
  }
};

export const updateEvent = async (id: string, formState: Event, photo: File) => {
  const token = storage.getToken('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  const formData = new FormData();
  if (photo) {
    formData.append('file', photo);
  }
  formData.append('name', formState.name);
  formData.append('description', formState.description);
  formData.append('startDate', formState.startDate);
  formData.append('endDate', formState.endDate);
  formData.append('type', formState.type);
  formData.append('maxCapacity', formState.maxCapacity.toString());
  formData.append('address', formState.location.address);
  formData.append('location[address]', formState.location.address);
  formData.append('location[latitude]', formState.location.latitude.toString());
  formData.append('location[longitude]', formState.location.longitude.toString());

  try {
    const response = await privateApi.put(`/event/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event data', error);
    throw error;
  }
};

export const addEvent = async (formState: Event, photo: File) => {
  const formData = new FormData();
  if (photo) {
    formData.append('file', photo);
  }
  formData.append('name', formState.name);
  formData.append('description', formState.description);
  formData.append('startDate', formState.startDate);
  formData.append('endDate', formState.endDate);
  formData.append('type', formState.type);
  formData.append('maxCapacity', formState.maxCapacity.toString());
  formData.append('address', formState.location.address);
  formData.append('location[address]', formState.location.address);
  formData.append('location[latitude]', formState.location.latitude.toString());
  formData.append('location[longitude]', formState.location.longitude.toString());

  try {
    const response = await privateApi.post(`/event/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create event');
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await privateApi.delete(`/event/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error('faild to delete event');
  }
};
