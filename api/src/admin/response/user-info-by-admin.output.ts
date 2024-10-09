import { ApiProperty } from '@nestjs/swagger';

export class UserInfoByAdminOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  verified: boolean;
}
