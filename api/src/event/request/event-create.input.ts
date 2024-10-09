import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Location } from 'src/shared/schemas/event.schemas';
import { z } from 'zod';

export enum EventType {
  Concert = 'concert',
  Conference = 'conference',
  Meetup = 'meetup',
  Workshop = 'workshop',
}

export class EventCreateInput {
  @ApiProperty()
  name: string;

  @ApiProperty()
  location: Location;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: EventType })
  @IsEnum(EventType)
  type: EventType;

  @ApiProperty()
  maxCapacity: number;
}

export const CreateEventValidator = z.object({
  name: z.string(),
  location: z.object({
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
  type: z.nativeEnum(EventType),
  maxCapacity: z.string(),
});

export type CreateEventInputType = z.infer<typeof CreateEventValidator>;
