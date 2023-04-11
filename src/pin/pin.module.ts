import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReplyModule } from 'src/reply/reply.module';
import { LikeModule } from './../like/like.module';
import { UserModule } from './../user/user.module';
import { PinController } from './pin.controller';
import { PinRepository } from './pin.repository';
import { PinService } from './pin.service';
import { Pin, PinSchema } from './schemas/pin.schema';

@Module({
  imports: [
    LikeModule,
    ReplyModule,
    UserModule,
    MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }]),
  ],
  controllers: [PinController],
  providers: [PinService, PinRepository],
})
export class PinModule {}
