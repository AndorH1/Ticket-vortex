import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

class TicketReservationInput {
  @ApiProperty()
  ticketId: string;

  @ApiProperty()
  amount: number;
}
export class UpdateReservationInput {
  @ApiProperty({ type: [TicketReservationInput] })
  tickets: TicketReservationInput[];
}

export const UpdateReservationValidator = z.object({
  tickets: z
    .array(
      z.object({
        ticketId: z.string(),
        amount: z.number(),
      })
    )
    .nonempty(),
});
