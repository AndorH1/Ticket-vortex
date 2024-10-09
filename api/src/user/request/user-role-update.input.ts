import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UpdateUserRoleInput {
  @ApiProperty()
  username: string;
  @ApiProperty()
  newRole: string;
}

export const UpdateUserRoleValidator = z.object({
  username: z.string(),
  newRole: z.string(),
});

export type UpdateUserRoleInputType = z.infer<typeof UpdateUserRoleValidator>;
