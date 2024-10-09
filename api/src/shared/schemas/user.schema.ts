import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { phantomPhoto } from '../utils';

@Schema()
export class UserModel extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: '' })
  phoneNumber: string;

  @Prop({
    default: phantomPhoto,
  })
  photo: string;

  @Prop({ default: '' })
  country: string;

  @Prop({ default: '' })
  city: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: false })
  verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
