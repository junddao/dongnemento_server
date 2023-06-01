import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly fcm: admin.messaging.Messaging;

  constructor() {
    const credential = admin.credential.cert('src/user/serviceAccountKey.json');
    admin.initializeApp({
      credential: credential,
    });

    this.fcm = admin.messaging();
  }

  async sendPushNotification(
    deviceToken: string,
    title: string,
    body: string,
  ): Promise<string> {
    const message: admin.messaging.Message = {
      token: deviceToken,
      notification: {
        title,
        body,
      },
    };

    try {
      const response = await this.fcm.send(message);
      return response;
    } catch (error) {
      throw new Error(`Failed to send push notification: ${error}`);
    }
  }
}
