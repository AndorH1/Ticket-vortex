import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UpdateUsernameInput {
  @ApiProperty()
  newUsername: string;
}

export const UpdateUsernameValidator = z.object({
  newUsername: z.string(),
});

export type UpdateUsernameInputType = z.infer<typeof UpdateUsernameValidator>;
