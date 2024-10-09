import { ApiProperty } from '@nestjs/swagger';
import { TicketCategory } from './create-ticket.input';
import { IsEnum } from 'class-validator';
import { z } from 'zod';

export class UpdateTicketInput {
  @ApiProperty({ required: true })
  price: number;

  @ApiProperty({ enum: TicketCategory, required: true })
  @IsEnum(TicketCategory)
  category: string;

  @ApiProperty({ required: true })
  quantity: number;
}

export const UpdateTicketValidator = z.object({
  price: z.number(),
  category: z.nativeEnum(TicketCategory),
  quantity: z.number(),
});

export type UpdateTicketInputType = z.infer<typeof UpdateTicketValidator>;
