import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel, UserSchema } from '../shared/schemas/user.schema';
import { EmailModule } from 'src/shared/module/email.module';
import { FirebaseService } from 'src/shared/firebase/firebase.service';
import { ImageService } from 'src/shared/image/image.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema, collection: 'users' }]),
    EmailModule,
  ],
  providers: [UserService, FirebaseService, ImageService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
