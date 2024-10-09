import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import {
  UserRegistrationInput,
  UserRegistrationValidator,
} from 'src/user/request/user-registration.input';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async registerService(userToCreate: UserRegistrationInput): Promise<any> {
    try {
      UserRegistrationValidator.parse(userToCreate);
    } catch (error) {
      throw new BadRequestException(error);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userToCreate.password, salt);
    const newUser: UserRegistrationInput = {
      ...userToCreate,
      password: hashedPassword,
    };
    return await this.usersService.create(newUser);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByUserName(username);
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch (error) {
      console.error('Error during user validation:', error);
      return null;
    }
  }
}
