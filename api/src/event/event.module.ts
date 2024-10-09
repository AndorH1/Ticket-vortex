import { forwardRef, Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModel, EventSchema } from 'src/shared/schemas/event.schemas';
import { ReservationModule } from 'src/reservation/reservation.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/shared/module/email.module';
import { ImageService } from 'src/shared/image/image.service';
import { FirebaseService } from 'src/shared/firebase/firebase.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventModel.name, schema: EventSchema, collection: 'events' },
    ]),
    forwardRef(() => ReservationModule),
    forwardRef(() => TicketModule),
    forwardRef(() => UserModule),
    forwardRef(() => EmailModule),
  ],
  providers: [EventService, ImageService, FirebaseService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
