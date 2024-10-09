import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TicketModel } from './ticket.schema';
import { ReservationModel } from './reservation.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Organizer } from 'src/event/response/event-info.output';

export class Location {
  @ApiProperty({
    description: 'The address of the event location',
    example: '123 Main St, City, Country',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Latitude of the event location', example: 47.4979 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the event location', example: 19.0402 })
  @IsNumber()
  longitude: number;
}

@Schema()
export class EventModel extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Object })
  location: Location;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  photo: string;

  @Prop({ required: true })
  availableCapacity: number;

  @Prop({ required: true })
  maxCapacity: number;

  @Prop({ type: [Types.ObjectId], ref: TicketModel.name, default: [] })
  tickets: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: ReservationModel.name, default: [] })
  reservations: Types.ObjectId[];

  @Prop({ required: true })
  organizer: Organizer;
}

export const EventSchema = SchemaFactory.createForClass(EventModel);
