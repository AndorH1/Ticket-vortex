import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UserLoginInput {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export const UserLoginValidator = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserLoginInputType = z.infer<typeof UserLoginValidator>;
