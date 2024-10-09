import { ApiProperty } from '@nestjs/swagger';

export class MyReservationDetailOutput {
  @ApiProperty()
  reservationId: string;

  @ApiProperty()
  eventId: string;

  @ApiProperty()
  eventName: string;

  @ApiProperty()
  eventType: string;

  @ApiProperty()
  eventStartDate: Date;

  @ApiProperty()
  eventPhoto: string;

  @ApiProperty()
  tickets: TicketDetail[];
}

export class TicketDetail {
  @ApiProperty()
  ticketId: string;

  @ApiProperty()
  ticketType: string;

  @ApiProperty()
  ticketAmount: number;
}
