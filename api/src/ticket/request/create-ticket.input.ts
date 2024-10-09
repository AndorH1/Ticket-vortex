import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { z } from 'zod';

export enum TicketCategory {
  VIP = 'VIP',
  General = 'General',
  EarlyBird = 'EarlyBird',
  Student = 'Student',
  Group = 'Group',
}

export class CreateTicketInput {
  @ApiProperty()
  eventId: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ enum: TicketCategory })
  @IsEnum(TicketCategory)
  category: TicketCategory;

  @ApiProperty()
  quantity: number;
}

export const CreateTicketValidator = z.object({
  eventId: z.string(),
  price: z.number(),
  category: z.nativeEnum(TicketCategory),
  quantity: z.number(),
});

export type CreateTicketInputType = z.infer<typeof CreateTicketValidator>;
