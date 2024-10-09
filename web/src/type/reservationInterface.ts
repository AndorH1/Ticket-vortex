import { Tickets } from './ticketInterface';
export interface Reservation {
  reservationId: string;
  eventId: string;
  userId: string;
  tickets: Tickets[];
  amount: number;
}
