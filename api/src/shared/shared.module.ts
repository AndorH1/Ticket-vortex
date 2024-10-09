import { Module } from '@nestjs/common';
import { EmailModule } from './module/email.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [EmailModule, FirebaseModule],
})
export class SharedModule {}
