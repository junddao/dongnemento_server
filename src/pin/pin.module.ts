import { LikeModule } from './../like/like.module';
import { LikeService } from './../like/like.service';
import { PinRepository } from './pin.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { PinController } from './pin.controller';
import { PinService } from './pin.service';
import { Pin, PinSchema } from './schemas/pin.schema';

@Module({
  imports: [
    LikeModule,
    UserModule,
    MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }]),
  ],
  controllers: [PinController],
  providers: [PinService, PinRepository],
})
export class PinModule {}
