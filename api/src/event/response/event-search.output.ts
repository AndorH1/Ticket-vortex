import { ApiProperty } from '@nestjs/swagger';
import { Location } from 'src/shared/schemas/event.schemas';
import { Organizer } from './event-info.output';
export class EventSearchOutput {
  @ApiProperty()
  eventId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  location: Location;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  type: string;

  @ApiProperty({ type: Organizer })
  organizer: Organizer;
}
