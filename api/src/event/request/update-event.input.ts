import { ApiProperty } from '@nestjs/swagger';
import { EventType } from './event-create.input';
import { IsEnum } from 'class-validator';
import { Location } from 'src/shared/schemas/event.schemas';
import { z } from 'zod';

export class UpdateEventInput {
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
  type: string;

  @ApiProperty()
  maxCapacity: number;
}

export const UpdateEventValidator = z.object({
  name: z.string(),
  location: z.object({
    address: z.string(),
    latitude: z.string(),
    longitude: z.string(),
  }),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
  type: z.nativeEnum(EventType),
  maxCapacity: z.string(),
});

export type UpdateEventInputType = z.infer<typeof UpdateEventValidator>;
