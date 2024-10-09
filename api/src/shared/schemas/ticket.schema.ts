import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class TicketModel extends Document {
  @Prop({ type: Types.ObjectId, ref: 'EventModel', required: true })
  eventId: Types.ObjectId;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  quantity: number;
}

export const TicketSchema = SchemaFactory.createForClass(TicketModel);
