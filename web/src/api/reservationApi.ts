import { privateApi, publicApi } from './apiConfig';
import { Reservation } from '../type/reservationInterface';
import { storage } from '../utils/storage';

export const getAllReservations = async () => {
  const token = storage.getToken('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await privateApi.get('/reservation/getAllReservations');
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations', error);
    throw error;
  }
};
export const getReservationById = async (id: string) => {
  const token = storage.getToken('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await publicApi.get(`/reservation/${id}`, {});
    return response.data;
  } catch (error) {
    console.error('Error fetching ticket data', error);
    throw error;
  }
};

export const updateReservationById = async (id: string, reservationData: Reservation) => {
  const token = storage.getToken('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await privateApi.put(`/reservation/${id}`, reservationData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event data', error);
    throw error;
  }
};

export const deleteReservation = async (id: string) => {
  try {
    const response = await privateApi.delete(`/reservation/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error to delete event');
  }
};

export const deleteReservationByAdmin = async (id: string) => {
  try {
    const response = await privateApi.delete(`/reservation/byAdmin/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error to delete event');
  }
};
