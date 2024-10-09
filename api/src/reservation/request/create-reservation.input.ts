import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
export class TicketReservationInput {
  @ApiProperty()
  ticketId: string;

  @ApiProperty()
  amount: number;
}

export class CreateReservationInput {
  @ApiProperty()
  eventId: string;

  @ApiProperty({ type: [TicketReservationInput] })
  tickets: TicketReservationInput[];
}

export const CreateReservationValidator = z.object({
  eventId: z.string(),
  tickets: z
    .array(
      z.object({
        ticketId: z.string(),
        amount: z.number(),
      })
    )
    .nonempty(),
});

export type CreateReservationInputType = z.infer<typeof CreateReservationValidator>;
