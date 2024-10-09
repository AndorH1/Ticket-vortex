import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt-strategy/jwt.strategy';
import { UserService } from '../user/user.service';
import { UserModel, UserSchema } from '../shared/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'src/shared/config/config';
import { EmailModule } from 'src/shared/module/email.module';
import { FirebaseService } from 'src/shared/firebase/firebase.service';
import { ImageService } from 'src/shared/image/image.service';

@Module({
  imports: [
    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.get('auth.jwtSecret'),
      // signOptions: { expiresIn: '60m' },
    }),
    EmailModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema, collection: 'users' }]),
  ],
  providers: [AuthService, JwtStrategy, UserService, FirebaseService, ImageService],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
