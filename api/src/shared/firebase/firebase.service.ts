import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class FirebaseService implements OnModuleInit {
  private storage: admin.storage.Storage;

  onModuleInit() {
    if (!admin.apps.length) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const serviceAccount = require('../../../firebase.config.json');

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'ticketvortex-1a2c2.appspot.com',
      });
    }

    this.storage = admin.storage();
  }

  getStorageInstance(): admin.storage.Storage {
    return this.storage;
  }
}
