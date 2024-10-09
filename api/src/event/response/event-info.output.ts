import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Location } from 'src/shared/schemas/event.schemas';

export class Organizer {
  @ApiProperty()
  id: Types.ObjectId;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  photo: string;
}

export class EventInfoOutput {
  @ApiProperty()
  eventId: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: Location })
  location: Location;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  description: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  maxCapacity: number;

  @ApiProperty()
  availableCapacity: number;

  @ApiProperty({ type: Organizer })
  organizer: Organizer;
}
