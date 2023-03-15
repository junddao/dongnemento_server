import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { HateService } from 'src/hate/hate.service';
import { LikeService } from './../like/like.service';
import { InCreatePinDto } from './dto/in_create_pin.dto';
import { InGetPinsDto } from './dto/in_get_pins.dto';
import { OutGetPinDto } from './dto/out_get_pin.dto';
import { PinRepository } from './pin.repository';
import { Pin } from './schemas/pin.schema';

@Injectable()
export class PinService {
  constructor(
    private readonly pinRepository: PinRepository,
    private readonly likeService: LikeService,
    private readonly hateService: HateService,
  ) {}

  async createPin(
    InCreatePinDto: InCreatePinDto,
    userId: ObjectId,
  ): Promise<Pin> {
    return this.pinRepository.createPin(InCreatePinDto, userId);
  }

  async getPins(inGetPinsDto: InGetPinsDto): Promise<Pin[]> {
    return this.pinRepository.find({
      lat: {
        $gt: inGetPinsDto.lat - inGetPinsDto.range / 90000,
        $lt: inGetPinsDto.lat + inGetPinsDto.range / 90000,
      },
      lng: {
        $gt: inGetPinsDto.lng - inGetPinsDto.range / 111000,
        $lt: inGetPinsDto.lng + inGetPinsDto.range / 111000,
      },
      // userId: userId,
    });
  }

  async getPin(_id: ObjectId, userId: ObjectId): Promise<OutGetPinDto> {
    // const id = new mongoose.Schema.Types.ObjectId(_id);
    const likeCount: number = await this.likeService.getLikeCount(_id);
    const hateCount: number = await this.hateService.getHateCount(_id);
    const result = await this.pinRepository.findOne({ _id });
    console.log('count' + likeCount);
    result.likeCount = likeCount;
    result.hateCount = hateCount;

    const isLiked = await this.likeService.isLikedByMe(_id, userId);
    console.log(isLiked);
    if (isLiked) result.isLiked = true;
    else result.isLiked = false;

    const isHated = await this.hateService.isHatedByMe(_id, userId);
    console.log(isHated);
    if (isHated) result.isHated = true;
    else result.isHated = false;

    return result;
  }

  // async setPinLike(
  //   inSetPinLike: InSetPinLike,
  //   userId: ObjectId,
  // ): Promise<void> {
  //   const inCreateLikeDto: InCreateLikeDto = {
  //     pinId: inSetPinLike._id.toString(),
  //   };
  //   this.likeService.setPinLike(inCreateLikeDto, userId);
  // }
}
