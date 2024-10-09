import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UpdateUserPasswordInput {
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  newPassword: string;
}

export const UpdateUserPasswordValidator = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

export type UpdateUserPasswordInputType = z.infer<typeof UpdateUserPasswordValidator>;
