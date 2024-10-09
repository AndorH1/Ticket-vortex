import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserLoginInput, UserLoginValidator } from 'src/user/request/user-login.input';
import { UserRegistrationInput } from 'src/user/request/user-registration.input';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/shared/module/email.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
  ) {}
  @Post('register')
  async register(@Body() userToCreate: UserRegistrationInput): Promise<any> {
    const createdUser = await this.authService.registerService(userToCreate);
    await this.emailService.successfulRegistration(createdUser);
    return {
      message: 'User has been registered successfully',
      user: createdUser,
    };
  }

  @Post('login')
  async login(@Body() loginDto: UserLoginInput) {
    try {
      UserLoginValidator.parse(loginDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
    const { username, password } = loginDto;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
