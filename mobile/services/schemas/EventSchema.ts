import { z } from 'zod';

export enum EventType {
  Concert = 'concert',
  Conference = 'conference',
  Meetup = 'meetup',
  Workshop = 'workshop',
}

const LocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
});

export const EventSchema = z.object({
  eventId: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  location: LocationSchema,
  photo: z.string(),
});

export const EventDetailsSchema = EventSchema.extend({
  maxCapacity: z.number(),
  availableCapacity: z.number(),
  description: z.string(),
  type: z.nativeEnum(EventType),
});

export type Event = z.infer<typeof EventSchema>;
export type EventDetails = z.infer<typeof EventDetailsSchema>;
export type Location = z.infer<typeof LocationSchema>;
