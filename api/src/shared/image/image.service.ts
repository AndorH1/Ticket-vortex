import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service'; // Importáld a megfelelő utat

@Injectable()
export class ImageService {
  constructor(private readonly firebaseService: FirebaseService) {}
  async uploadProfilePicture(file: Express.Multer.File, oldPictureUrl?: string): Promise<string> {
    if (oldPictureUrl) {
      await this.deleteFile(oldPictureUrl);
    }
    const url = await this.uploadFile(file, 'profile-pictures');
    return url;
  }

  async uploadEventPicture(file: Express.Multer.File, oldPictureUrl?: string): Promise<string> {
    if (oldPictureUrl) {
      await this.deleteFile(oldPictureUrl);
    }
    const url = await this.uploadFile(file, 'event-pictures');
    return url;
  }

  async uploadFile(file: Express.Multer.File, destination: string): Promise<string> {
    const bucket = this.firebaseService.getStorageInstance().bucket();
    // Rövidítsd le a fájl nevét (példa: csak az első 20 karaktert hagyod meg)
    const truncatedFileName = file.originalname.substring(0, 20);
    const fileUpload = bucket.file(`${destination}/${truncatedFileName}`);
    return new Promise((resolve, reject) => {
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
      stream.on('error', (error) => reject(error));
      stream.on('finish', async () => {
        try {
          await fileUpload.makePublic();
          resolve(
            `https://storage.googleapis.com/${bucket.name}/${destination}/${truncatedFileName}`
          );
        } catch (error) {
          reject(error);
        }
      });
      stream.end(file.buffer);
    });
  }

  async deleteFile(fileUrl: string) {
    try {
      const relativePath = fileUrl.replace(
        'https://storage.googleapis.com/knowledgetree-31838.appspot.com/',
        ''
      );
      const storage = this.firebaseService.getStorageInstance();
      const bucket = storage.bucket();
      bucket.deleteFiles({
        prefix: relativePath,
      });
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
}
