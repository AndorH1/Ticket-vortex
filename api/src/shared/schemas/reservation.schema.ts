import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ReservationModel extends Document {
  @Prop({ type: Types.ObjectId, ref: 'EventModel', required: true })
  eventId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [{ ticketId: Types.ObjectId, amount: Number }], default: [] })
  tickets: { ticketId: Types.ObjectId; amount: number }[];
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationModel);
