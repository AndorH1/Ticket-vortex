import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { config } from './shared/config/config';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { ReservationModule } from './reservation/reservation.module';
import { FirebaseModule } from './shared/firebase/firebase.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.get('db.url')),
    AuthModule,
    UserModule,
    SharedModule,
    AdminModule,
    EventModule,
    TicketModule,
    ReservationModule,
    FirebaseModule,
  ],
})
export class AppModule {}
