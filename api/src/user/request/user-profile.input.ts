import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UserProfileInput {
  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: true })
  lastName: string;

  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  phoneNumber: string;

  @ApiProperty({ required: true })
  country: string;

  @ApiProperty({ required: true })
  city: string;

  @ApiProperty({ required: true })
  address: string;
}

export const UserProfileValidator = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  country: z.string(),
  city: z.string(),
  address: z.string(),
});

export type UserProfileInputType = z.infer<typeof UserProfileValidator>;
