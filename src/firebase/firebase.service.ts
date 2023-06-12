import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';

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
    image: string | null,
    authorId: string,
    targetId: string,
  ): Promise<string> {
    const message: admin.messaging.Message = {
      token: deviceToken,

      data: {
        title: title,
        body: body,
        image: image,
        authorId: authorId,
        targetId: targetId,
      },
    };

    try {
      const response = await this.fcm.send(message);
      return response;
    } catch (error) {
      throw new Error(`Failed to send push notification: ${error}`);
    }
  }

  async sendMultiCasePushNotification(
    deviceTokens: string[],
    title: string,
    body: string,
    image: string,
    authorId: string,
    targetId: string,
  ): Promise<BatchResponse> {
    console.log(deviceTokens);
    const message: admin.messaging.MulticastMessage = {
      tokens: deviceTokens,

      data: {
        title,
        body,
        image,
        authorId,
        targetId,
      },
    };

    try {
      const response = await this.fcm.sendMulticast(message);
      return response;
    } catch (error) {
      throw new Error(`Failed to send push notification: ${error}`);
    }
  }
}
