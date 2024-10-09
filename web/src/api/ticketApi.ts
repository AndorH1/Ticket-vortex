import { privateApi, publicApi } from './apiConfig';
import { Ticket } from '../type/ticketInterface';

export const getAllTickets = async () => {
  try {
    const response = await publicApi.get('/ticket/getAllTickets');
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets', error);
    throw error;
  }
};
export const addTicket = async (ticket: Ticket) => {
  try {
    const response = await privateApi.post(`/ticket/createTicket`, ticket);

    return response.data;
  } catch (error) {
    throw new Error('Failed to add ticket');
  }
};

export const getTicketById = async (id: string) => {
  try {
    const response = await publicApi.get(`/ticket/${id}`, {});
    return response.data;
  } catch (error) {
    console.error('Error fetching ticket data', error);
    throw error;
  }
};

export const updateTicketById = async (id: string, ticketData: Ticket) => {
  try {
    const response = await privateApi.put(`/ticket/${id}`, ticketData);
    return response.data;
  } catch (error) {
    console.error('Error updating event data', error);
    throw error;
  }
};
export const deleteTicket = async (id: string) => {
  try {
    const response = await privateApi.delete(`/ticket/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete ticket');
  }
};
