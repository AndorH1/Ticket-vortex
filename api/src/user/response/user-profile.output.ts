import { ApiProperty } from '@nestjs/swagger';

export class UserProfileOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  verified: boolean;
}
