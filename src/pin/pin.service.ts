import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ReplyService } from 'src/reply/reply.service';
import { User } from 'src/user/schemas/user.schema';
import { LikeService } from './../like/like.service';
import { InCreatePinDto } from './dto/in_create_pin.dto';
import { InGetPinsDto } from './dto/in_get_pins.dto';
import { OutGetPinDto } from './dto/out_get_pin.dto';
import { OutGetPinsDto } from './dto/out_get_pins.dto';
import { PinRepository } from './pin.repository';
import { Pin } from './schemas/pin.schema';

@Injectable()
export class PinService {
  constructor(
    private readonly pinRepository: PinRepository,
    private readonly likeService: LikeService,
    private readonly replyService: ReplyService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async createPin(
    InCreatePinDto: InCreatePinDto,
    userId: string,
  ): Promise<Pin> {
    const pin = await this.pinRepository.createPin(InCreatePinDto, userId);
    // await this.firebaseService.sendPushNotification(
    //   'dQeAPc08tk-NjdzuB4pvG5:APA91bExQYDQ1cpR87pOSkliYTUd1wMfOzJWfapmoj44bBKmxoHsQpc1_kfouE7BpVw7bxObuQL8yOm9ml9bV--gbzTxcO8dZWXWDZQJZZQ5nreOsCox9DeE90e6vbhI8qqVN6Q0lj9h',
    //   'aa',
    //   'aa',
    // );
    return pin;
  }

  async getPins(inGetPinsDto: InGetPinsDto): Promise<OutGetPinsDto[]> {
    const result = await this.pinRepository.find({
      lat: {
        $gt: inGetPinsDto.lat - inGetPinsDto.range / 60000,
        $lt: inGetPinsDto.lat + inGetPinsDto.range / 60000,
      },
      lng: {
        $gt: inGetPinsDto.lng - inGetPinsDto.range / 90000,
        $lt: inGetPinsDto.lng + inGetPinsDto.range / 90000,
      },
    });

    const pins = result.map((pin) => {
      return OutGetPinsDto.from(pin);
    });

    for (let i = 0; i < pins.length; i++) {
      const likeCount: number = await this.likeService.getLikeCount(pins[i].id);

      pins[i].likeCount = likeCount;
      const replyCount: number = (
        await this.replyService.getPinReplies(pins[i].id)
      ).length;

      pins[i].replyCount = replyCount;
    }

    const sortedPins = pins.sort((a, b) => {
      return a.likeCount > b.likeCount ? -1 : 1;
    });

    return sortedPins;
  }

  async getMyPins(me: User): Promise<OutGetPinsDto[]> {
    const userId = me.id;
    const result = await this.pinRepository.find({ userId });

    const pins = result.map((pin) => {
      return OutGetPinsDto.from(pin);
    });

    for (let i = 0; i < pins.length; i++) {
      const likeCount: number = await this.likeService.getLikeCount(pins[i].id);

      pins[i].likeCount = likeCount;
      const replyCount: number = (
        await this.replyService.getPinReplies(pins[i].id)
      ).length;

      pins[i].replyCount = replyCount;
    }

    const sortedPins = pins.sort((a, b) => {
      return a.likeCount > b.likeCount ? -1 : 1;
    });

    return sortedPins;
  }

  async getPin(id: string, userId: string): Promise<OutGetPinDto> {
    // const id = new mongoose.Schema.Types.ObjectId(_id);
    const likeCount: number = await this.likeService.getLikeCount(id);

    const result = await this.pinRepository.findById(id);

    result.likeCount = likeCount;

    const selectedPin = OutGetPinDto.from(result);

    const isLiked = await this.likeService.isLikedByMe(id, userId);

    if (isLiked) selectedPin.isLiked = true;
    else selectedPin.isLiked = false;

    return selectedPin;
  }

  async deletePin(_id: string): Promise<void> {
    await this.pinRepository.delete({ _id });
  }
}
