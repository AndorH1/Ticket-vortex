import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtStrategy } from '../auth/jwt-strategy/jwt.strategy';
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
  providers: [AdminService, JwtStrategy, UserService, FirebaseService, ImageService],
  controllers: [AdminController],
  exports: [AdminService, JwtStrategy],
})
export class AdminModule {}
