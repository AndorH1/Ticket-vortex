import { Organizer } from './organizerInterface';
import { Reservation } from './reservationInterface';
import { Ticket } from './ticketInterface';

export interface Location {
  address: string;
  latitude: string;
  longitude: string;
}

export interface Event {
  _id: string;
  name: string;
  eventId: string;
  location: Location;
  startDate: string;
  endDate: string;
  description: string;
  type: string;
  photo: string;
  availableCapacity: number;
  maxCapacity: number;
  tickets: Ticket[];
  reservations: Reservation[];
  organizer: Organizer;
}

export enum EventType {
  Concert = 'concert',
  Conference = 'conference',
  Meetup = 'meetup',
  Workshop = 'workshop',
}
