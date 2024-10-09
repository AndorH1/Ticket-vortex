import { EventModel } from 'src/shared/schemas/event.schemas';
import { EventInfoOutput } from '../response/event-info.output';
import { EventSearchOutput } from '../response/event-search.output';

export const mapEventModelToEventInfoOutput = (event: EventModel): EventInfoOutput => {
  return {
    eventId: event._id.toString(),
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      address: event.location.address,
      latitude: Number(event.location.latitude),
      longitude: Number(event.location.longitude),
    },
    type: event.type,
    photo: event.photo,
    maxCapacity: event.maxCapacity,
    availableCapacity: event.availableCapacity,
    organizer: {
      id: event.organizer.id,
      firstName: event.organizer.firstName,
      lastName: event.organizer.lastName,
      photo: event.organizer.photo,
    },
  };
};

export const mapEventModelToEventSearchOutput = (event: EventModel): EventSearchOutput => {
  return {
    eventId: event._id.toString(),
    name: event.name,
    location: {
      address: event.location.address,
      latitude: Number(event.location.latitude),
      longitude: Number(event.location.longitude),
    },
    startDate: event.startDate,
    endDate: event.endDate,
    photo: event.photo,
    type: event.type,
    organizer: {
      id: event.organizer.id,
      firstName: event.organizer.firstName,
      lastName: event.organizer.lastName,
      photo: event.organizer.photo,
    },
  };
};
