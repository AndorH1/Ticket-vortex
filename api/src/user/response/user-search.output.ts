import { ApiProperty } from '@nestjs/swagger';

export class UserSearchOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  photo: string;
}
