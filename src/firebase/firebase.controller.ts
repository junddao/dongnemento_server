import { Body, Controller, Post } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('/sendPushNotification')
  sendPushNotification(
    @Body('deviceToken') deviceToken: string,
    @Body('title') title: string,
    @Body('body') body: string,
    @Body('image') image: string | null,
    @Body('authorId') authorId: string,
    @Body('targetId') targetId: string,
  ): Promise<string> {
    return this.firebaseService.sendPushNotification(
      deviceToken,
      title,
      body,
      image,
      authorId,
      targetId,
    );
  }
}
