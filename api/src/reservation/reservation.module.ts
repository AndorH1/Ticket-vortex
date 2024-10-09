import { forwardRef, Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationModel, ReservationSchema } from 'src/shared/schemas/reservation.schema';
import { EventModule } from 'src/event/event.module';
import { TicketModel, TicketSchema } from 'src/shared/schemas/ticket.schema';
import { TicketModule } from 'src/ticket/ticket.module';
import { EventModel, EventSchema } from 'src/shared/schemas/event.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReservationModel.name, schema: ReservationSchema, collection: 'reservations' },
      { name: TicketModel.name, schema: TicketSchema, collection: 'tickets' },
      { name: EventModel.name, schema: EventSchema, collection: 'events' },
    ]),
    forwardRef(() => TicketModule),
    forwardRef(() => EventModule),
  ],
  providers: [ReservationService],
  controllers: [ReservationController],
  exports: [ReservationService],
})
export class ReservationModule {}
