import { Injectable } from '@nestjs/common';
import { ReplyService } from 'src/reply/reply.service';
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
  ) {}

  async createPin(
    InCreatePinDto: InCreatePinDto,
    userId: string,
  ): Promise<Pin> {
    return this.pinRepository.createPin(InCreatePinDto, userId);
  }

  async getPins(inGetPinsDto: InGetPinsDto): Promise<OutGetPinsDto[]> {
    const result = await this.pinRepository.find({
      lat: {
        $gt: inGetPinsDto.lat - inGetPinsDto.range / 90000,
        $lt: inGetPinsDto.lat + inGetPinsDto.range / 90000,
      },
      lng: {
        $gt: inGetPinsDto.lng - inGetPinsDto.range / 111000,
        $lt: inGetPinsDto.lng + inGetPinsDto.range / 111000,
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
