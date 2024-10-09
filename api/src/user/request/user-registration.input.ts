import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UserRegistrationInput {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export const UserRegistrationValidator = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export type UserRegistrationInputType = z.infer<typeof UserRegistrationValidator>;
